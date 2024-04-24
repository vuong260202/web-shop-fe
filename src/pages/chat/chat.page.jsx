import React, {useEffect, useRef, useState} from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SendOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    WechatOutlined,
} from '@ant-design/icons';
import {Avatar, Button, Input, Layout, Menu, theme, Upload} from 'antd';
import {useLocation, useNavigate} from "react-router-dom";
import Header from "../../components/header/Header";
import {Editor, EditorState, RichUtils} from 'draft-js';
import AtomicBlockUtils from "draft-js/lib/AtomicBlockUtils";
import FetchApi from "../../components/api/Fetch.api";
import webService from "../../service/webService";

const {Sider, Content} = Layout;

const ChatPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userId = new URLSearchParams(location.search).get("userId");
    const receiverId = new URLSearchParams(location.search).get("receiverId")
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState(null);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);
    const [contentChat, setContentChat] = useState(null);
    const [allUsers, setAllUsers] = useState(null);
    const [admin, setAdmin] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [filterUser, setFilterUser] = useState(null);

    // Hàm xử lý khi gửi tin nhắn
    const sendMessage = () => {
        if (input.trim() !== '') {
            console.log(contentChat);
            FetchApi.chatAPI.addContent({
                content: input,
                chatId: contentChat.chatId,
            }).then((res) => {
                setInput('');
                openChat(receiverId);
            })
        }
    };

    const openChat = (receiverId) => {
        console.log(">>>>>");
        FetchApi.chatAPI.getChatWithReceiver(receiverId).then((chat) => {
            setContentChat(chat);
        })
    }

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [contentChat?.contentChats]);


    useEffect(() => {

        FetchApi.chatAPI.getUser().then(response => {
            console.log(response);
            setUser(response);

            FetchApi.chatAPI.allUsers().then((res) => {
                console.log(res);
                setAllUsers(res);

                let ad = res.filter(user => user.role === 'admin')[0];
                console.log(ad);

                if (response.chat.filter(r => r.id === ad.id).length === 0) {
                    setAdmin(ad);
                }
            })
        })

        if (receiverId) {
            console.log(">>")
            openChat(receiverId);
        }

    }, [userId, receiverId]);

    return (<div>
            <Header/>
            <div>
                <Layout>
                    {/*{receiverId && openChat(receiverId)}*/}
                    <Sider style={{backgroundColor: "#413f3f"}}>
                        <div style={{
                            display: "flex", flexDirection: "column", height: "100%"
                        }}>
                            <div style={{flexGrow: 1, alignItems: "center", textAlign: "center", fontSize: "20px", marginBottom: "-20px"}}>
                                <h3>Đoạn chat</h3>
                            </div>
                            <div style={{flexGrow: 1, margin: "5px"}}>
                                <Input
                                    placeholder="Nhập tên người dùng..."
                                    onChange={(e) => {
                                        if (e.target.value.trim() !== '') {
                                            setFilterUser(allUsers.filter(user => user.username.toLowerCase().includes(e.target.value.trim().toLowerCase())));
                                        } else {
                                            setFilterUser(null);
                                        }
                                    }}
                                />
                            </div>
                            <div style={{flexGrow: 8}}>
                                {!filterUser ? <div>
                                    {admin &&
                                            <a style={{ color: (admin.id === parseInt(receiverId)) ? "blue" : "black" }} onClick={() => {
                                                if (receiverId !== admin.id){
                                                    navigate(`/chat?${new URLSearchParams({userId: userId, receiverId: admin.id})}`)
                                                } else {
                                                    navigate(`/chat?${new URLSearchParams({userId: userId})}`)
                                                }
                                            }}>
                                                <div style={{display: "flex", alignItems: "center", marginLeft: '5px'}}>
                                                    <div>
                                                        {webService.getAvatar(admin?.avatar)}
                                                    </div>
                                                    {admin.username}
                                                </div>
                                            </a>
                                    }
                                    {user && user.chat.map(ur => {
                                        console.log(ur, receiverId);
                                        return (
                                            <a style={{ color: (ur.id === parseInt(receiverId)) ? "blue" : "black" }} onClick={() => {
                                                if (receiverId !== ur.id){
                                                    navigate(`/chat?${new URLSearchParams({userId: userId, receiverId: ur.id})}`)
                                                } else {
                                                    navigate(`/chat?${new URLSearchParams({userId: userId})}`)
                                                }
                                            }}>
                                                <div style={{display: "flex", alignItems: "center"}}>
                                                    <div>
                                                        {webService.getAvatar(ur?.avatar)}
                                                    </div>
                                                    {ur.username}
                                                </div>
                                            </a>
                                        )
                                    })}
                                </div> : <div>
                                    {filterUser && filterUser.map(ur => {
                                        return (
                                            <a style={{ color: (ur.id === parseInt(receiverId)) ? "red" : "black" }} onClick={() => {
                                                if (receiverId !== ur.id){
                                                    navigate(`/chat?${new URLSearchParams({userId: userId, receiverId: ur.id})}`)
                                                } else {
                                                    navigate(`/chat?${new URLSearchParams({userId: userId})}`)
                                                }
                                            }}>
                                                <div style={{display: "flex", alignItems: "center"}}>
                                                    <div>
                                                        {webService.getAvatar(ur?.avatar)}
                                                    </div>
                                                    {ur.username}
                                                </div>
                                            </a>
                                        )
                                    })}
                                </div>}

                            </div>
                        </div>
                    </Sider>
                    <div style={{
                        margin: "20px",
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "center",
                        width: "100%",
                        height: "450px"
                    }}>
                        <Content style={{
                            height: "100%", display: "flex", flexDirection: "column"
                        }}>
                            <div style={{flex: 10}}>
                                {contentChat && (
                                    <div style={{
                                        backgroundColor: "#e5dddd",
                                        marginBottom: '20px',
                                        display: "flex",
                                        flexDirection: "column-reverse",
                                        height: "100%",
                                    }}>
                                        {contentChat && contentChat.contentChats.map((content, index) => (
                                            content.senderId === user?.id ? <div key={index} style={{
                                                alignSelf: "flex-end",
                                                marginLeft: "initial",
                                                marginRight: "initial",
                                                display: "flex",
                                                margin: "8px",
                                                alignItems: "center"
                                            }}>
                                                <div>
                                                    {content.content}
                                                </div>
                                                <div>
                                                    {webService.getAvatar(user?.avatar)}
                                                </div>
                                            </div>
                                            : <div key={index} style={{
                                                    alignSelf: "flex-start",
                                                    marginLeft: "auto",
                                                    marginRight: "auto",
                                                    display: "flex",
                                                    margin: "8px",
                                                    alignItems: "center"
                                                }}>
                                                    <div>
                                                        {webService.getAvatar(user?.avatar)}
                                                    </div>
                                                    <div>
                                                        {content.content}
                                                    </div>

                                                </div>
                                        ))}
                                        <div ref={messagesEndRef}/>
                                    </div>
                                )}
                            </div>

                            <div style={{flex: 2, display: "flex", alignItems: "center"}}>
                                <div>
                                    {webService.getAvatar(user?.avatar)}
                                </div>
                                <div style={{flex: 7, marginLeft: "10px"}}>
                                    <Input
                                        type="text"
                                        value={input}
                                        placeholder="Nhập tin nhắn..."
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                sendMessage();
                                            }
                                        }}
                                        onChange={(e) => setInput(e.target.value)}/>
                                </div>

                                <div style={{}}>
                                    <SendOutlined onClick={sendMessage}/>
                                </div>
                            </div>
                        </Content>
                    </div>
                </Layout>
            </div>
    </div>);
};
export default ChatPage;