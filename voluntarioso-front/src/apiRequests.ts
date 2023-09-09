const defaultProxy = 'http://localhost:5094/api';

const apiRequestEnpoints = {
    ONGRegister: `${defaultProxy}/ONGAccount/register`,
    ONGLogin: `${defaultProxy}/ONGAccount/login`,
    VoluntarioRegister: `${defaultProxy}/VolunteerAccount/register`,
    VoluntarioLogin: `${defaultProxy}/VolunteerAccount/login`,
    ObterONGVoluntariosByOngId: `${defaultProxy}/ONG/ong-volunteer`,
    ObterONGById: `${defaultProxy}/ONG`,
    AceitarVoluntario: `${defaultProxy}/ONG`,
    RemoverVoluntario: `${defaultProxy}/ONG`,
    ObterListaONG: `${defaultProxy}/Volunteer`,
    CandidatarONG: `${defaultProxy}/Volunteer`,
    AdicionarSugestao: `${defaultProxy}/Volunteer/add-suggestion-to-ong`,
    ObterProjetos: `${defaultProxy}/Volunteer/get-projects`,
    ProjectRegister: `${defaultProxy}/Volunteer/project-register`,
};

export default apiRequestEnpoints;
