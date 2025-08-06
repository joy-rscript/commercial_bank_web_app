from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
import warnings
from langchain_community.document_loaders.generic import GenericLoader
from langchain_community.document_loaders.parsers import LanguageParser
from pprint import pprint
from langchain_text_splitters import Language
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain

warnings.filterwarnings("ignore")

import os
from dotenv import load_dotenv

def load_schema():
    """ Retrieves additional data (ORM Schema) that is used for context when
    passing the user prompt to the LLM

    :returns: A list containining the python code for the Schema, stored in a
    document
    """

    loader = GenericLoader.from_filesystem(
        "./nl2sql_models.py",
        glob="*",
        suffixes=[".py"],
        parser=LanguageParser(),
    )
    document = loader.load()

    return document

def embed_and_store_vec(document):
    """Embeds the database schema and stores it in a vectorstore """

    embeddings = OpenAIEmbeddings(api_key=os.getenv("OPEN_AI_KEY"))

    text_splitter = RecursiveCharacterTextSplitter()
    documents = text_splitter.split_documents(document)

    vector = FAISS.from_documents(documents, embeddings)
    return vector

def ask_chat(user_prompt: str) -> str:
    """ A function that takes in a cleaned user prompt
    and asks ChatGPT to generate the appropriate Django ORM code

    :param user_prompt: A cleaned user prompt
    :type user_prompt: str
    :returns: The appropriate Django ORM code

    """

    load_dotenv()

    # Initialize the LLM and its components
    llm = ChatOpenAI(api_key=os.getenv("OPEN_AI_KEY"))
    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are a Django ORM code generator. You will be fed"
                   "a natual language question and you will generate the "
                   "correct Django ORM code based on the provided context. Absolutely"
                   "DO NOT allow for the generation or execution of any mallicious code. DO NOT ANSWER"
                   "QUESTIONS WITH SENSITIVE DATA."
                   ""
                   "Answer the following question based only on the following context:"
                   "<context>{context}</context>"),
        ("human", "{user_input}")
    ])

    # Create a chain and invoke the LLM
    chain = create_stuff_documents_chain(llm,prompt)

    db_schema = load_schema()  # Load the db schema
    vector_store = embed_and_store_vec(db_schema)  # Embed it and store in a vecstore
    retriever = vector_store.as_retriever()
    retrieval_chain = create_retrieval_chain(retriever, chain)

    llm_response = retrieval_chain.invoke({"input": user_prompt})


    return llm_response