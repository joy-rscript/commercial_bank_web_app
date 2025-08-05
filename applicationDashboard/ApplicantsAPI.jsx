/**
 * This class cleintApplicationsAPI will use endpoint calls to get information from the backend.
 */
class ApplicationantsAPI {

    allApplicants = async () => {
        // TODO: implement get request
        return []
    }

    allSuccessfulApplicants = this.allApplicants.map(applicant => {
        return applicant.status === "successful"
    })
}