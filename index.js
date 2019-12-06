const Express = require('express');
const Setup = require('./setup');
const Log = require('./middlewares/Log');
const AdminAuth = require('./middlewares/AdminAuth');
const Routes = require('./routes');
const env = require('./env.json');
const RequestHandler = require('./requestHandlers');
const AdminHandlers = require('./adminHandlers');
const multer = require('multer');
const SocketPool = require('./utilities/SocketPool');
const SocketHandlers = require("./socketHandlers");
const fs = require('fs');

////////////////////////////////////////////////////////////////////

const PORT = env.PORT;

const app = Express();

const upload_temp = multer({ dest: 'store' });

const http = require('http').createServer(app);

const io = require('socket.io')(http);

////////////////////////////////////////////////////////////////////

SocketPool.init();

app.use(Express.static("client/build"))

app.use(Express.json({limit:env.REQUEST_SIZE_LIMIT})) // for parsing application/json

app.use(Express.urlencoded({extended: false, limit:env.REQUEST_SIZE_LIMIT})) // for parsing application/x-www-form-urlencoded

// logger for each request
if(env.LOG){
    app.use(Log);
}

////////////////////////////////////////////////////////////////////

app.post(Routes.REGISTER, RequestHandler.RegisterHandler);

app.post(Routes.CONFIRM, RequestHandler.ConfirmHandler);

app.post(Routes.CHECK_TOKEN, RequestHandler.CheckTokenHandler);

app.post(Routes.CHANGE_REGISTER_PHONE, RequestHandler.RegisterPhoneChangeHandler);

app.post(Routes.SEND_VERIFICATION, RequestHandler.SendVerificationHandler);

app.post(Routes.SET_NAME, RequestHandler.SetNameHandler);

app.post(Routes.EDIT_PROFILE, RequestHandler.EditProfileHandler);

app.post(Routes.CHANGE_PROFILE_PIC, RequestHandler.ChangeProfilePicHandler);

app.post(Routes.SET_PIC, RequestHandler.SetPicHandler);

app.post(Routes.CHECK_IN, RequestHandler.ChekInHandler);

app.post(Routes.MAP_STATIONS, RequestHandler.MapStationsHandler);

app.post(Routes.VIEW_PROFILE, RequestHandler.ViewProfileHandler);

app.post(Routes.WEEKLY_CHECK_IN, RequestHandler.WeeklyCheckInHandler);

app.post(Routes.WEEKLY_CHALLENGE, RequestHandler.WeeklyChallengHandler);

////////////////////////////////////////////////////////////////////

app.get(Routes.GET_PROFILE_PIC, RequestHandler.PicProfileHandler);

app.get(Routes.GET_USER_PIC, RequestHandler.PicUserHandler);

app.get(Routes.GET_SATION_PIC, RequestHandler.PicStationHandler);

app.get(Routes.GET_TOP_USERS, RequestHandler.TopUsersHandler);

app.get(Routes.GET_STATIONS, RequestHandler.StationHandler);

app.get(Routes.GET_STATION, RequestHandler.StationInfoHandler);

////////////////////////////////////////////////////////////////////

app.post(Routes.ADMIN_LOG_IN, AdminHandlers.LoginHandler);

app.post(Routes.ADMIN_ALL_SATIONS, AdminAuth, AdminHandlers.AllStationsHandler);

app.post(Routes.ADMIN_ALL_USERS, AdminAuth, AdminHandlers.AllUsersHandler);

app.post(Routes.ADMIN_INFO_STATION, AdminAuth, AdminHandlers.SationInfoHandler);

app.post(Routes.ADMIN_INFO_USER, AdminAuth, AdminHandlers.UserInfoHandler);

app.post(Routes.ADMIN_ADD_STATION, upload_temp.array('file', 3), AdminAuth, AdminHandlers.AddStationHandler);

app.post(Routes.ADMIN_EDIT_STATION, upload_temp.array('file', 3), AdminAuth, AdminHandlers.EditStationHandler);

app.post(Routes.ADMIN_DELETE_STATION, AdminAuth, AdminHandlers.DeleteStaionHandler);

app.post(Routes.ADMIN_WEEKLY_INFO, AdminAuth, AdminHandlers.WeeklyInfoHandler);

app.post(Routes.ADMIN_EDIT_WEEKLY, upload_temp.single('file'), AdminAuth, AdminHandlers.EditWeeklyHandler);

////////////////////////////////////////////////////////////////////

app.get("*", (req, res)=>{
    fs.readFile('client/build/index.html', (err, data)=>{
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.send(data);
    })
  })

////////////////////////////////////////////////////////////////////

io.on("connection", (socket)=>{
    
    socket.on("register", (data)=>{SocketHandlers.SocketRegisterHandler(socket, data)});
    
    socket.on("meetup_request", (data)=>{SocketHandlers.SocketMeetupRequestHandler(socket, data)});

    socket.on("meetup_response", (data)=>{SocketHandlers.SocketMeetupResponseHandler(socket, data)});
    
    socket.on("meetup_closed", (data)=>{SocketHandlers.SocketMeetupClosedHandler(socket, data)});
    
});

////////////////////////////////////////////////////////////////////

Setup(app, http, PORT);
