import React, { useMemo, useState, useEffect } from "react";
import { createAvatar } from '@dicebear/core';
import {
    adventurer, avataaars, adventurerNeutral,
    avataaarsNeutral, bigEars, bigEarsNeutral, bigSmile,
    bottts, botttsNeutral, croodles, croodlesNeutral,
    funEmoji, icons, identicon, lorelei, loreleiNeutral,
    micah, miniavs, openPeeps, personas, pixelArt, pixelArtNeutral,
    shapes, thumbs
} from '@dicebear/collection';

const avatarsList = [adventurer, avataaars, adventurerNeutral,
    avataaarsNeutral, bigEars, bigEarsNeutral, bigSmile,
    bottts, botttsNeutral, croodles, croodlesNeutral,
    funEmoji, icons, identicon, lorelei, loreleiNeutral,
    micah, miniavs, openPeeps, personas, pixelArt, pixelArtNeutral,
    shapes, thumbs];

function Avatars({ avatarName }) {
    
    const [selectedAvatar, setSelectedAvatar] = useState(adventurer);
    useEffect(()=>{

        setSelectedAvatar(avatarsList.find((el) => el.meta.title === avatarName))
    },[avatarName])


    const avatar = useMemo(() => {
        return createAvatar(selectedAvatar, {
            size: 100,
            seed: 'demo-user-seed',
        }).toDataUri();
    }, [selectedAvatar]);


    return (
        <div >
            <img src={avatar} alt="Avatar" />
        </div>
    );

}

export default Avatars;