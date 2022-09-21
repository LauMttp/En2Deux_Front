import React, { useContext, useEffect, useState } from 'react'
import { Button, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios'

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import UserAvatar from './UserAvatar';



function SearchBar ({friends}) {
    const initialSearchState='Please select a user';
    const {token, user} = useContext(AuthContext)
    const [allUsers, setAllUsers]= useState([])
    const [searchQuery, setSearchQuery] = useState(initialSearchState)
    const [oneUser, setOneUser] = useState(null)
    const [reqSent, setReqSent] = useState([false, ""])
    const [isFriend, setIsFriend] = useState(false)

    console.log(oneUser)

    useEffect(() => {
          const config = {
            method: 'get',
            url: 'http://localhost:5005/api/user/all',
            headers: { 
              'Authorization': `Bearer ${token}`
            }
        }

        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            setAllUsers([searchQuery,...response.data.map(el => el.username)]);
        })
        .catch(function (error) {
            console.log(error);
        });

    }, []);

    //WHEN CLICK ON SEARCH
    const handleSearch = () => {
        const config = {
            method: 'get',
            url: `http://localhost:5005/api/user/${searchQuery}`,
            headers: { 
              'Authorization': `Bearer ${token}`
            }
          };
          
        axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            setOneUser(response.data)
            checkFriendship(response.data[0].username);
            
          })
          .catch(function (error) {
            console.log(error);
          });
          
    }

    //AFTER handleSearch() WHEN DISPLAY USER
    const checkFriendship = (username) => {
        const config = {
            method: 'get',
            url: `http://localhost:5005/api/friend/search?username=${username}`,
            headers: { 
              'Authorization': `Bearer ${token}`
            }
          };
          
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            if(response.data.length>0){
                setIsFriend(true)
            } else {
                setIsFriend(false)
                checkInvite()
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    const checkInvite = () => {
        const config = {
            method: 'get',
            url: 'http://localhost:5005/api/friend/invitations',
            headers: { 
              'Authorization': `Bearer ${token}`
            }
        };
          
        axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            if(response.data.length>0){
                if(response.data.requestor.username === user.username )
                    setReqSent([true, "requestor"]);
                else{
                    setReqSent([true, "requested"])
                }
                
            }else{
                setReqSent([false], "")
            }

          })
          .catch(function (error) {
            console.log(error);
          });
          
    }

    //IF FRIENDSHIP DOES NOT EXIST
    const handleInvite = () =>{
        const config = {
            method: 'post',
            url: `http://localhost:5005/api/friend/${oneUser[0]._id}`,
            headers: { 
              'Authorization': `Bearer ${token}`
            }
        };
          
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            setReqSent(true);
        })
          .catch(function (error) {
            console.log(error);
        });
    }

    console.log("allUsers", allUsers)
    console.log("oneUser", oneUser)
    console.log("searchQuery", searchQuery)
    return (

        <>
        <Autocomplete
            value={searchQuery}
            onChange={(event, newValue) => setSearchQuery(newValue)}
            disablePortal
            id="combo-box-demo"
            options={allUsers}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Search a username" />}
        />
        <Button variant="outlined" color="success" onClick={handleSearch}>
        Search
        </Button>
        <div>
           { oneUser ?
            (<>
            <ListItemButton>
            <ListItemAvatar>
                <UserAvatar initial={oneUser[0].name.charAt(0) + oneUser[0].surname.charAt(0)} />
            </ListItemAvatar>
            <ListItemText id={oneUser[0]._id} primary={oneUser[0].username} secondary={`${oneUser[0].name} ${oneUser[0].surname}`} />
            </ListItemButton>
            {isFriend ?
                (
                <Button className='add-button' variant="contained" >
                Friend
                </Button>
                ):(
                reqSent[0] ?
                    (reqSent[1]==="requestor" ?
                        (<Button className='add-button' variant="contained">
                        Pending
                        </Button>
                        ):(
                        <Button className='add-button' variant="contained">
                        Check your invitations
                        </Button>
                        )
                    ):(
                        <Button className='add-button' variant="contained" onClick={handleInvite}>
                        Send Invite
                        </Button>
                    )
                )}
            </>
            ): (
                <></>
            )  
            }
        </div>
        </>
    )
}



         /* {handleSearch ? (
            <>
                <ListItemButton>
                    <ListItemAvatar>
                        <UserAvatar initial={handleSearch.name.charAt(0) + handleSearch.surname.charAt(0)} />
                    </ListItemAvatar>
                    <ListItemText id={handleSearch._id} primary={handleSearch.username} secondary={`${handleSearch.name} ${handleSearch.surname}`} />
                </ListItemButton>
                {!reqSent ?
                (<Button className='add-button' variant="contained">
                Send Invite
                </Button>):(
                <Button className='add-button' variant="contained">
                Invite Sent
                </Button>
                )

                }
            </>
            ): null
            } */


 // const handleSearch = () => {
    //     //axios req get one user by username
    //     const config = {
    //         method: 'get',
    //         url: `http://localhost:5005/api/user/${searchQuery}`,
    //         headers: { 
    //           'Authorization': `Bearer ${token}`
    //         }
    //       };
          
    //       axios(config)
    //       .then(function (response) {
    //         console.log(JSON.stringify(response.data));

    //       })
    //       .catch(function (error) {
    //         console.log(error);
    //       });
    // }

    // const handleAdd =(id)=>{
    //     const config = {
    //         method: 'post',
    //         url: `http://localhost:5005/api/friend/${id}`,
    //         headers: { 
    //           'Authorization': `Bearer ${token}`
    //         }
    //     };
          
    //       axios(config)
    //       .then(function (response) {
    //         console.log(JSON.stringify(response.data));
    //         setReqSent(true);
    //     })
    //       .catch(function (error) {
    //         console.log(error);
    //     });
    // }

export default SearchBar