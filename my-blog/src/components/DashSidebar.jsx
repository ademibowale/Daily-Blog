import React from 'react';
import {Sidebar} from 'flowbite-react';
import {HiUser,HiArrowSmRight,HiDocumentText,HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,} from 'react-icons/hi';
import{useEffect,useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

function DashSidebar() {
    const location = useLocation()
    const dispatch = useDispatch();
    const[tab, setTab] = useState('')
    useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab');
    if(tabFromUrl ){
    setTab(tabFromUrl);
      }
    },[location.search])

    const handleSignout = async () => {
      try {
        const res = await fetch("/api/user/signout", {
          method: "POST",
        });
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
        } else {
          dispatch(signoutSuccess());
        }
      } catch (error) {
        console.log(error.message);
      }
    };

  return (
    <Sidebar className='w-full md:56'>
    <Sidebar.Items>
      <Sidebar.ItemGroup>
        <Link to='/dashboard?tab=profile'>
      <Sidebar.Item
      active={tab === 'profile'}
      icon={HiUser}
      label={'user'}labelColor='dark' as='div'>
      Profile
     </Sidebar.Item>
        </Link>
        <Link to='/dashboard?tab=posts'/>
        <Sidebar.Item
                active={tab === 'posts'}
                icon={HiDocumentText}
                as='div'
              >Post</Sidebar.Item>
     <Sidebar.Item
      icon={HiArrowSmRight}
      className='cursor-pointer' onClick={handleSignout}>
    Sign Out
     </Sidebar.Item>
    </Sidebar.ItemGroup>
    </Sidebar.Items>
    </Sidebar>       
  )
}

export default DashSidebar
