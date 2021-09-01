import styled from "styled-components"
export const Container = styled.div``
export const TopContent = styled.div`
.username{
    font-size:2rem;
    font-weight:bold;
    text-align:center;
    margin-top:40px;

}
.interact-bar{
    border-top:1px solid black;
    border-bottom:1px solid black;
    display:flex;
    align-items:center;
    justify-content:space-between;
    // padding:3px 10px;
    ul{
        list-style-type:none;
        padding:0;
        margin:0;
      
    }
    .navbar-left{
        display:flex;
        li{
            // padding:1rem 1rem 0rem 1rem;
            a{
                font-weight:bold;
                color:rgba(0,0,0,0.5);
                height:100%;
                display:flex;
                flex-direction:column;
                justify-content:space-between;
                &:hover{
                    text-decoration:none;
                }
                span{
                    padding:1rem;
                    margin:5px 0px;
                    border-radius:5px;
                    &:hover{
                        background:rgb(240,242,245);
                    }
                }
                &.active{
                    &::after{
                        content:"";
                        display:block;
                        width:100%;
                        height:3px;
                        background:rgb(24,118,242);
                    }
                }
            }
           
        }
    }
}
`
export const Banner = styled.div`
background-image:url(https://cdn.wallpapersafari.com/49/39/wTqGH9.jpg);
background-size:cover;
background-position:center;
height:350px;
width:100%;
position:relative;
.avatar{
    width:100%;
    position:absolute;
    bottom:-30px;
    display:flex;
    justify-content:center;
    img{
        width:20%;
        border-radius:50%;
        border:3px solid black;
    }
}
`
export const MainContent = styled.div`
display:grid;
grid-template-columns:1fr 3fr;
padding-top:5%;
`
export const Sidebar = styled.div``
export const ListPosts = styled.div``
