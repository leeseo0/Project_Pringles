import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import SidebarItem from "./SidebarItem";
import profile from "../../images/user.png"

const Side = styled.div`
    flex: 0 0 20%;
    display: flex;
    background-color: #f5f5f5;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: 100vh;
`
const Profile = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 100%;
    margin-top: 150px;
`
const Menu = styled.div`
    margin-top: 100px;
    width: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const activeStyle = {
    textDecoration:'none',
    color: "#F78535",
    fontSize:'19px',
    fontWeight: 700
}

function Sidebar() {

    const pathName = useLocation().pathname;

    const menus = [
        {name: "전체 일정 목록", path: "/mypage/planlist"},
        // {name: "여행 기록", path: "/mypage/record"},
        {name: "찜", path: "/mypage/bookmark"},
        {name: "공유 게시판", path: "/share"},
        // {name: "리뷰", path: "/mypage/review"},
    ];
    
    return (
        <Side>
            <Profile src={profile}></Profile>
            <br/>
            <Link to='/mypage' style={{textDecoration:'none', color:'black'}}><h5 style={{fontSize:"23px"}}><b>{window.localStorage.getItem("username")}님</b></h5></Link>
            {/* <div className="sidebar"> */}
                <Menu>
                    <br/>
                {menus.map((menu, index) => {
                    return (
                        <NavLink exact style={({isActive}) => (isActive ? activeStyle : {color:"#454a50", textDecoration:"none", fontSize:"18px", fontWeight:'bold'})}
                        to={menu.path}
                        key={index}
                        activeStyle={{color:"orange"}}>
                        <SidebarItem menu={menu}/>
                        </NavLink>
                        // <Link to={menu.path} key={index}>
                        //     <SidebarItem 
                        //         menu={menu}
                        //         isActive={pathName === menu.path ? true : false}   // 현재 URL pathname과 객체에 담긴 path값 일치 여부 확인
                        //     />
                        // </Link>
                    );
                })}
                </Menu>
            {/* </div> */}
        </Side>
    )
}

export default Sidebar;