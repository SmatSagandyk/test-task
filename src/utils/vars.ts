// общее
export const MOBILE_BREAKPOINT = 650; //px

// маршруты
export const _ALL_PATH = "/*";
export const ALL_PATH = "*";
export const _HOME_PATH = "/";
export const _LOGIN_PATH = "/login";
export const _ID_PATH = "/chat/:id";
export const ID_PATH = "chat/:id";
export const _FAQ_PATH = "/faq";
export const _ADD_PATH = "/add";

// auth
export enum FormInputType {
    ID = "id",
    TOKEN = "token",
    MESSAGE = "message",
    PHONE = "phone",
    NAME = "name",
}

// API
export const GREEN_API = "https://api.green-api.com";
export const API_WA_INSTANCE = "/waInstance";
export const API_GET_SETTINGS = "/getSettings/";
export const API_GET_STATE_INSTANCE = "/getStateInstance/";
export const API_GET_CHATS = "/getChats/";
export const API_GET_CHAT_HISTORY = "/getChatHistory/";
export const API_SEND_MESSAGE = "/sendMessage/";
export const API_RECEIVE_NOTICE = "/receiveNotification/";
export const API_DELETE_NOTICE = "/deleteNotification/";
export const API_CHECK_WHATSAPP = "/checkWhatsapp/";

export const CONTENT_TYPE_DATA = "application/json;charset=utf-8";

export enum EApiMethod {
    GET = "GET",
    POST = "POST",
    DELETE = "DELETE",
}

export enum ELocalStorageState {
    ID = "greenApiId",
    TOKEN = "greenApiToken",
}

export enum ERequestStatus {
    INITIAL = "null",
    LOADING = "loading",
    ERROR = "error",
    SUCCESS = "success",
}

export enum EAccountStatus {
    AUTHORIZED = "authorized",
    NOT_AUTHORIZED = "notAuthorized",
    BLOCKED = "blocked",
}

export enum EChatList {
    USER = "user",
    GROUP = "group",
}

export enum EMessageSender {
    INCOMING = "incoming",
    OUTGOING = "outgoing",
}
export enum EMessageType {
    // текстовое сообщение
    TEXT = "textMessage",

    // текстовое сообщение, сообщение с URL или рекламное сообщение
    EXTENDED = "extendedTextMessage",

    // сообщение с изображением, видео, аудио, документом
    IMAGE = "imageMessage",
    VIDEO = "videoMessage",
    DOCUMENT = "documentMessage",
    AUDIO = "audioMessage",

    // сообщение с геолокацией
    LOCATION = "locationMessage",

    // сообщение с контактом
    CONTACT = "contactMessage",

    // сообщение с массивом контактов
    CONTACTS = "contactsArrayMessage",

    // сообщение с кнопками
    BUTTON = "buttonsMessage",

    // сообщение со списком выбора
    LIST = "listMessage",

    // сообщение с шаблонным кнопками
    TEMPLATE = "templateMessage",

    // сообщение со стикером
    STICKER = "stickerMessage",

    // сообщение-реакция
    REACTION = "reactionMessage",

    // сообщение приглашение в группу
    GROUP_INVITED = "groupInviteMessage",

    // сообщение опроса
    POLL = "pollMessage",

    // Сообщение с цитатой
    QOUTED = "quotedMessage",
}

//Статус отправленного сообщения или файла. Статус принимает значения:
export enum EMessageStatus {
    //сообщение отправлено
    SENT = "sent",

    //сообщение доставлено до получателя
    DELIVERED = "delivered",

    //сообщение прочитано/просмотрено/прослушано получателем
    READ = "read",

    //произошла ошибка при отправке сообщения на сервер WhatsApp
    FAILED = "failed",

    //на номере телефона получателя не зарегистрирован аккаунт WhatsApp
    NO_ACCOUNT = "noAccount",

    //отправитель не является участником группового чата, в который выполняется отправка сообщения
    NO_IN_GROUP = "notInGroup",
}

// Входящие уведомления могут быть следующих типов:
export enum ETypeWebhook {
    // уведомление о входящих сообщениях и файлах
    INCOMING_MESSAGE_RECEIVED = "incomingMessageReceived",

    // уведомление о сообщении, отправленного с телефона
    OUTGOING_MESSAGE_RECEVEIVED = "outgoingMessageReceived",

    // уведомление о сообщении, отправленного из API
    OUTGOING_API_MESSAGE_RECEIVED = "outgoingAPIMessageReceived",

    // уведомление о статусе отправленного сообщения
    OUTGOING_MESSAGE_STATUS = "outgoingMessageStatus",

    // уведомление об изменении состояния авторизации аккаунта
    STATE_INSTANCE_CHANGED = "stateInstanceChanged",

    // уведомление об изменении состояния сокета аккаунта
    STATUS_INSTANCE_CHANGED = "statusInstanceChanged",

    // уведомление об устройстве (телефоне) и уровне заряда батареи
    DEVICE_INFO = "deviceInfo ",

    // уведомление о входящем звонке
    INCOMING_CALL = "incomingCall",
}
