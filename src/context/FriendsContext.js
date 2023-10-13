import { createContext } from "react";

export  const FriendsContext = createContext({
    requests: "",
    setRequests: () => {},
    friends: "",
    setFriends: () => {}
})