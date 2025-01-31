// login
export type TLoginData = {
    id: string;
    token: string;
};

// account
export type TAccount = {
    response: string;
    wid: string;
    countryInstance: string;
    typeAccount: string;
    webhookUrl: string;
    webhookUrlToken: string;
    delaySendMessagesMilliseconds: number;
    markIncomingMessagesReaded: string;
    markIncomingMessagesReadedOnReply: string;
    sharedSession: string;
    proxyInstance: string;
    outgoingWebhook: string;
    outgoingMessageWebhook: string;
    outgoingAPIMessageWebhook: string;
    incomingWebhook: string;
    deviceWebhook: string;
    statusInstanceWebhook: string;
    stateWebhook: string;
    enableMessagesHistory: string;
    keepOnlineStatus: string;
};

export type TAccountStatus = {
    stateInstance: string;
};

// messages
export type TMessageId = {
    idMessage: string;
};

type TChatId = {
    chatId: string;
};

export type TMessageIncoming = TMessageId &
    TChatId & {
        type: string;
        timestamp: number;
        typeMessage: string;
        textMessage?: string;
        extendedMessage?: {
            text: string;
            description: string;
            title: string;
            previewType: string;
            jpegThumbnail: string;
            forwardingScore: any;
            isForwarded: any;
        };
        statusMessage?: string;
        sendByApi?: boolean;
        downloadUrl?: string;
        caption?: string;
        fileName?: string;
        jpegThumbnail?: string;
        isForwarded?: boolean;
        forwardingScore?: number;
        senderId?: string;
        senderName?: string;
    };

export type TMessagesList = TMessageIncoming[];

export type TMessageSending = TChatId & {
    message: string;
    quotedMessageId?: string;
};

// chat list
export type TChatElement = {
    archive: boolean;
    id: string;
    notSpam: boolean;
    ephemeralExpiration: number;
    ephemeralSettingTimestamp: number;
    mute?: number;
    name?: string;
};
export type TChatList = TChatElement[];

// уведомления
export type TNoticeBody = TChatId &
    TMessageId & {
        typeWebhook: string;
        instanceData: {
            idInstance: number;
            wid: string;
            typeInstance: string;
        };
        timestamp: number;
        senderData?: {
            chatId: string;
            sender: string;
            chatName: string;
            senderName: string;
        };
        messageData: {
            typeMessage: string;
            textMessageData?: {
                textMessage: string;
            };
            extendedTextMessageData?: {
                text: string;
                stanzaId?: string;
                participant?: string;
                description?: string;
                title?: string;
                jpegThumbnail?: string;
                forwardingScore?: number;
                isForwarded?: boolean;
            };
            quotedMessage?: {
                stanzaId: string;
                participant: string;
                typeMessage: string;
                textMessage?: string;
                downloadUrl?: string;
                caption?: string;
                jpegThumbnail?: string;
                contact?: {
                    displayName: string;
                    vcard: string;
                };
                location?: {
                    nameLocation: string;
                    address: string;
                    jpegThumbnail: string;
                    latitude: string;
                    longitude: string;
                };
                extendedTextMessage?: {
                    description: string;
                    title: string;
                    previewType: string;
                    jpegThumbnail: string;
                };
            };
        };
        status: string;
        sendByApi: boolean;
    };

export type TNotice = {
    receiptId: number;
    body: TNoticeBody;
};

export type TCheckWhatsapp = {
    existsWhatsapp: boolean;
};
