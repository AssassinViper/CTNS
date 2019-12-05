const AllStationsHandler = require("./AllStationsHandler");
const AddStationHandler = require("./AddStationHandler");
const AllUsersHandler = require("./AllUsersHandler");
const DeleteStaionHandler = require("./DeleteStaionHandler");
const EditStationHandler = require("./EditStationHandler");
const EditWeeklyHandler = require("./EditWeeklyHandler");
const SationInfoHandler = require("./SationInfoHandler");
const UserInfoHandler = require("./UserInfoHandler");
const WeeklyInfoHandler = require('./WeeklyInfoHandler');
const LoginHandler = require('./LoginHandler');

const AdminHandlers = {
    AllStationsHandler,
    AddStationHandler,
    AllUsersHandler,
    DeleteStaionHandler,
    EditStationHandler,
    EditWeeklyHandler,
    SationInfoHandler,
    UserInfoHandler,
    WeeklyInfoHandler,
    LoginHandler
}

module.exports = AdminHandlers;