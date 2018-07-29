import fetch from './fetch'


var Login = (username, password) => fetch('POST', 'user/login', { username: username, password: password })

// var Register = (username, password) => fetch('POST', 'user/register', {username: username, password: password})

var LogOut = () => fetch('GET', 'user/logout', {})

// var uploadTest = (data) => fetch('POST', 'admin/artist/updateImg', data, 'upload')

// Designer
var designerCreate = (data) => fetch('POST', 'admin/designer/create', data, 'upload')

var designerDelete = (data) => fetch('POST', 'admin/designer/delete', data)

var getDesignerById = (id) => fetch('GET', 'admin/designer/select/' + id)

var getAllByFirstName = () => fetch('GET', 'admin/designer/getAllDesignerNamesByFirst')

var getAllDesigners = (pageOffset, itemSize) => fetch('GET', 'admin/designer/getAll', { pageOffset: pageOffset, itemSize: itemSize })

var getAllCampaign = (id, pageOffset, itemSize) => fetch('GET', 'admin/designer/getAllCampaigns/' + id, { pageOffset: pageOffset, itemSize: itemSize })

var getAllLookBook = (id, pageOffset, itemSize) => fetch('GET', 'admin/designer/getAllLookbooks/' + id, { pageOffset: pageOffset, itemSize: itemSize })

var getAllBranding = (id, pageOffset, itemSize) => fetch('GET', 'admin/designer/getAllBrandings/' + id, { pageOffset: pageOffset, itemSize: itemSize })

var getAllCooperation = (id, pageOffset, itemSize) => fetch('GET', 'admin/designer/getAllCooperations/' + id, { pageOffset: pageOffset, itemSize: itemSize })

var editDesigner = (data) => fetch('POST', 'admin/designer/update', data, 'upload')

var updateDesignerRanks = (data) => fetch('POST', 'admin/designer/updateRanks', data)

var addCampaign = (d_id, c_id) => fetch('POST', 'admin/designer/addCampaign', { designerId: d_id, campaignId: c_id })

var addBranding = (d_id, b_id) => fetch('POST', 'admin/designer/addBranding', { designerId: d_id, brandingId: b_id })

var addCooperation = (d_id, c_id) => fetch('POST', 'admin/designer/addCooperation', { designerId: d_id, cooperationId: c_id })

var addLookbook = (d_id, l_id) => fetch('POST', 'admin/designer/addLookbook', { designerId: d_id, lookbookId: l_id })

var deleteCampaign = (d_id, c_id) => fetch('POST', 'admin/designer/deleteCampaign', { designerId: d_id, campaignId: c_id })

var deleteBranding = (d_id, b_id) => fetch('POST', 'admin/designer/deleteBranding', { designerId: d_id, brandingId: b_id })

var deleteCooperation = (d_id, c_id) => fetch('POST', 'admin/designer/deleteCooperation', { designerId: d_id, cooperationId: c_id })

var deleteLookbook = (d_id, l_id) => fetch('POST', 'admin/designer/deleteLookbook', { designerId: d_id, lookbookId: l_id })

// Campaign
var campaignCreate = (data) => fetch('POST', 'admin/campaign/create', data, 'upload')

var campaignDelete = (data) => fetch('POST', 'admin/campaign/delete', data)

var getCampaignById = (id) => fetch('GET', 'admin/campaign/select/' + id)

var updateCampaign = (data) => fetch('POST', 'admin/campaign/update', data, 'upload')

var updateCampaignCover = (data) => fetch('POST', 'admin/campaign/updateImg', data, 'upload')

var addImgCampaign = (data) => fetch('POST', 'admin/campaign/addImg', data, 'upload')

var deleteImgCampaign = (data) => fetch('POST', 'admin/campaign/deleteImg', data, 'upload')

// Lookbook
var lookBookCreate = (data) => fetch('POST', 'admin/lookbook/create', data, 'upload')

var lookBookDelete = (data) => fetch('POST', 'admin/lookbook/delete', data)

var getLookBookById = (id) => fetch('GET', 'admin/lookbook/select/' + id)

var updateLookbook = (data) => fetch('POST', 'admin/lookbook/update', data, 'upload')

var updateLookbookCover = (data) => fetch('POST', 'admin/lookbook/updateImg', data, 'upload')

var addImgLookbook = (data) => fetch('POST', 'admin/lookbook/addImg', data, 'upload')

var deleteImgLookbook = (data) => fetch('POST', 'admin/lookbook/deleteImg')

// Cooperation
var cooperationCreate = (data) => fetch('POST', 'admin/cooperation/create', data, 'upload')

var cooperationDelete = (data) => fetch('POST', 'admin/cooperation/delete', data)

var getCooperationById = (id) => fetch('GET', 'admin/cooperation/select/' + id)

var updateCooperation = (data) => fetch('POST', 'admin/cooperation/update', data, 'upload')

var updateCooperationCover = (data) => fetch('POST', 'admin/cooperation/updateImg', data, 'upload')

var addImgCooperation = (data) => fetch('POST', 'admin/cooperation/addImg', data, 'upload')

var deleteImgCooperation = (data) => fetch('POST', 'admin/cooperation/deleteImg', data, 'upload')

// Branding
var brandingCreate = (data) => fetch('POST', 'admin/branding/create', data, 'upload')

var brandingDelete = (data) => fetch('POST', 'admin/branding/delete', data)

var getBrandingById = (id) => fetch('GET', 'admin/branding/select/' + id)

var updateBranding = (data) => fetch('POST', 'admin/branding/update', data, 'upload')

var updateBrandingCover = (data) => fetch('POST', 'admin/branding/updateImg', data, 'upload')

var addImgBranding = (data) => fetch('POST', 'admin/branding/addImg', data, 'upload')

var deleteImgBranding = (data) => fetch('POST', 'admin/branding/deleteImg', data, 'upload')

// Show
var showCreate = (data) => fetch('POST', 'admin/show/create', data, 'upload')

var showDelete = (data) => fetch('POST', 'admin/show/delete', data)

var getShowById = (id) => fetch('GET', 'admin/show/select/' + id)

var getShowByName = (name) => fetch('GET', 'admin/show/selectByName/' + name)

var getAllByYear = () => fetch('GET', 'admin/show/getAllByYear')

var getAllByDesigner = (id) => fetch('GET', 'admin/show/getAllByDesignerId/' + id)

var getAllShows = (pageOffset, itemSize) => fetch('GET', 'admin/show/getAll', { pageOffset: pageOffset, itemSize: itemSize })

var addDesignerToShow = (d_id, s_id) => fetch('POST', 'admin/show/updateDesigner', { designerId: d_id, id: s_id }, 'upload')

var addImgToShow = (data) => fetch('POST', 'admin/show/addImg', data, 'upload')

var deleteImgFromShow = (data) => fetch('POST', 'admin/show/deleteImg', data, 'upload')

var updateShowCover = (data) => fetch('POST', 'admin/show/updateImg', data, 'upload')

var updateShow = (data) => fetch('POST', 'admin/show/update', data, 'upload')

var getSeasons = () => fetch('GET', 'admin/show/getSeasons')

var getAllBySeason = (year, season) => fetch('GET', `admin/show/getAllBySeason/${year}/${season}`)

var createSeason = (data) => fetch('POST', 'admin/show/createSeason', data)

var deleteSeason = (data) => fetch('POST', 'admin/show/deleteSeason', data)

// Worker
var workerCreate = (data) => fetch('POST', 'admin/worker/create', data, 'upload')

var workerDelete = (data) => fetch('POST', 'admin/worker/delete', data)

var updateWorker = (data) => fetch('POST', 'admin/worker/update', data)

var updateWorkerCover = (data) => fetch('POST', 'admin/worker/updateImg', data, 'upload')

var getAllWorkers = (pageOffset, itemSize) => fetch('GET', 'admin/worker/getAll', { pageOffset: pageOffset, itemSize: itemSize })

// Contact
var getContact = () => fetch('GET', 'admin/contact/get')

var updateContact = (data) => fetch('POST', 'admin/contact/update', data)

var sendContact = (data) => fetch('POST', 'message/create', data)

// News
var newsCreate = (data) => fetch('POST', 'admin/news/create', data, 'upload')

var newsDelete = (data) => fetch('POST', 'admin/news/delete', data)

var getAllNews = (pageOffset, itemSize) => fetch('GET', 'admin/news/getAll', { pageOffset: pageOffset, itemSize: itemSize })

var updateNews = (data) => fetch('POST', 'admin/news/update', data, 'upload')

var updateNewsCover = (data) => fetch('POST', 'admin/news/updateImg', data, 'upload')

var getNewsById = (id) => fetch('GET', 'admin/news/select/' + id)

var getNewsByTag = (id) => fetch('GET', 'admin/news/recommand/' + id)

var uploadImg = (data) => fetch('POST', 'admin/createImg', data, 'upload')

// Tags
var tagCreate = (data) => fetch('POST', 'admin/tag/create', data)

var tagDelete = (data) => fetch('POST', 'admin/tag/delete', data, 'upload')

var updateTag = (data) => fetch('POST', 'admin/tag/update', data, 'upload')

var getAllTags = () => fetch('GET', 'admin/tag/findAll')

// Jsons
var getAllJsons = () => fetch('GET', 'admin/config/extraTitle')
var setJson = (data) => fetch('POST', 'admin/config/extraTitle', data)

export {
    Login,
    LogOut,
    designerCreate,
    designerDelete,
    getDesignerById,
    getAllDesigners,
    getAllBranding,
    getAllCooperation,
    getAllCampaign,
    getAllByFirstName,
    getAllLookBook,
    editDesigner,
    updateDesignerRanks,
    addCampaign,
    addBranding,
    addCooperation,
    addLookbook,
    deleteCampaign,
    deleteBranding,
    deleteCooperation,
    campaignCreate,
    getCampaignById,
    updateCampaign,
    campaignDelete,
    updateCampaignCover,
    addImgCampaign,
    deleteImgCampaign,
    deleteLookbook,
    lookBookCreate,
    getLookBookById,
    updateLookbook,
    lookBookDelete,
    updateLookbookCover,
    addImgLookbook,
    deleteImgLookbook,
    cooperationCreate,
    getCooperationById,
    updateCooperation,
    cooperationDelete,
    updateCooperationCover,
    addImgCooperation,
    deleteImgCooperation,
    brandingCreate,
    getBrandingById,
    brandingDelete,
    updateBranding,
    updateBrandingCover,
    addImgBranding,
    deleteImgBranding,
    showCreate,
    showDelete,
    getShowById,
    getShowByName,
    getAllShows,
    addDesignerToShow,
    addImgToShow,
    deleteImgFromShow,
    updateShowCover,
    updateShow,
    getAllByYear,
    getAllByDesigner,
    workerCreate,
    workerDelete,
    updateWorker,
    updateWorkerCover,
    getAllWorkers,
    newsCreate,
    newsDelete,
    updateNews,
    updateNewsCover,
    getNewsById,
    getAllNews,
    tagCreate,
    tagDelete,
    updateTag,
    getAllTags,
    getNewsByTag,
    uploadImg,
    getContact,
    updateContact,
    sendContact,
    getAllJsons,
    setJson,
    getSeasons,
    getAllBySeason,
    createSeason,
    deleteSeason
}
