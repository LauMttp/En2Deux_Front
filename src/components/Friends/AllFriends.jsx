import React from 'react'
import FriendRow from './FriendRow'
import './AllFriends.css'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';


const AllFriends = ({friends, user}) => {
  return (
    <div className='AllFriends'>
        <h2> Friends </h2>
          <ul>
            {
              friends.length === 0 ?
              ( <>
                  <li>Your don't have friends yet.
                  <br/>Add them with their usernames !</li>
                </>
              ):(
                <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {friends.map((friend) => {
                  return (<ListItem key={friend._id} disablePadding>
                            {
                              friend.requestor._id === user._id  ?
                              ( <FriendRow friend={friend.requested}/>
                              ):(
                                <FriendRow friend={friend.requestor}/>)
                            }
                          </ListItem>
                  )
                })}
                </List>
              )
            }
          </ul>
    </div>
  )
}

// const [checked, setChecked] = React.useState([1]);

// const handleToggle = (value) => () => {
//   const currentIndex = checked.indexOf(value);
//   const newChecked = [...checked];

//   if (currentIndex === -1) {
//     newChecked.push(value);
//   } else {
//     newChecked.splice(currentIndex, 1);
//   }

//   setChecked(newChecked);
// };
export default AllFriends;

    
            
         
