unsafe_words = {
    "delete", "drop", "truncate", "update", "insert", "alter", "grant", "revoke",
    "create", "execute", "cascade", "rollback", "commit", "begin transaction",
    "savepoint", "index", "primary key", "foreign key", "constraint", "having",
    "case", "set", "limit", "use", "show", "describe", "desc", "grant option",
    "create temporary table", "create view", "show tables", "show databases",
    "show columns", "show grants", "show index", "show view", "show triggers",
    "show variables", "show create table", "show create view", "show create procedure",
    "show create function", "show table status", "show procedure status",
    "show grants for", "lock tables", "unlock tables", "rename table",
    "drop index", "drop view", "drop database", "drop procedure", "drop function",
    "drop trigger", "flush", "load data infile", "select into outfile",
    "exec", "into dumpfile", "set global"
}

django_orm_unsafe_words = {
    "raw", "extra", "select_related", "prefetch_related", "values", "values_list",
    "defer", "only", "using", "iterator", "update", "bulk_create", "aggregate",
    "annotate", "distinct", "filter", "exclude", "get", "create", "get_or_create",
    "update_or_create", "exists", "count", "earliest", "latest", "first", "last",
    "order_by", "reverse", "distinct", "none", "all", "union", "intersection", "difference"
}

unsafe_words.update(django_orm_unsafe_words)
