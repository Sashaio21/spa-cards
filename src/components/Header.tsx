import { CustomButton } from "./ui-elements"
import Image from "next/image";
import Link from "next/link";
import {Input} from "@mui/material"
import '../app/globals.css'

export default function Header() {
    return (
        <header 
            className="row"
            style={{
                gap: "20px",
                justifyContent: "space-between",
                padding: "2px",
                marginBottom: "50px"
            }}
        >
            <nav
            style={{
                alignSelf: "center"
            }}
            >
                <ul className="row"
                    style={{
                        gap: "20px"
                    }}
                >
                    <li><Link href="/">Главная</Link></li>
                    <li><Link href="/products">Продукты</Link></li>
                </ul>
            </nav>
            <div 
                className="row"
                style={{
                    gap: "20px",
                    justifyContent: "end",
                    padding: "2px"
                }}
            >
                <Link href={"/admin/create-product"}><CustomButton>Добавить товар</CustomButton></Link>
            </div>
        </header>
    )
}