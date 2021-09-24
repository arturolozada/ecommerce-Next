import React, { useEffect, useState } from 'react';
import { Container, Grid, Image, Input, Flag } from "semantic-ui-react"
import Link from "next/link";
import { useRouter } from 'next/router';


export default function TopBar() {
    return (
        <div className="top-bar">
            <Container>
                <Grid className="top-bar">
                    <Grid.Column width={8} className="top-bar__left">
                        <Logo />
                    </Grid.Column>
                    <Grid.Column width={8} className="top-bar__right">
                        <Search />
                    </Grid.Column>
                </Grid>
            </Container>
        </div>
    )
}

function Logo() {
    return (
        <Link href="/">
            <a>
                <Image src="/logopas.png" alt="Productos"/>
            </a>
        </Link>        
    );
};

function Search() {
    const [searchStr, setSearchStr] = useState("");
    const [load, setLoad] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if(load) {
            router.push(`/search?query=${searchStr}`);
        };
        setLoad(true);
    }, [searchStr]);

    return (
        <Input 
            id="search-game"
            icon={{ name: "search" }}
            value={router.query.query}
            onChange={(_, data) => setSearchStr(data.value)}
        />
    )
}

// function DatosC() {
//     return (
//         <div>
//             <p>tel: <Flag name="co"/>+57 316 4470715 </p>
//             Cra 37A # 25 – 52
//         </div>
//     );
// }