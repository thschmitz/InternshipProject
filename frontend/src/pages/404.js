/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";

export default function FourOhFour() {
    return (
        <div className="max-w-5xl mx-auto items-center flex w-full h-screen justify-center">
            <div className="flex w-full items-center justify-center text-xl">
                <img src="https://styles.redditmedia.com/t5_snz6f/styles/profileIcon_snoob38a4a76-a1cc-41e3-99c2-f076cf95bd3e-headshot-f.png?width=256&height=256&crop=256:256,smart&s=0612aa2f5e6473dd59f60bad0371e68bccde200c"  alt="404" />
            </div>
            <div className="w-full items-center justify-center text-xl">
                <h1 className="text-center font-bold text-2xl mt-10">Não achou nada?</h1>
                <h1 className="text-xl text-center mt-10">Não se preocupe</h1>
                <Link href="/">
                    <h1 className="text-2xl text-center underline text-gray-500 mt-10 cursor-pointer hover:text-gray-600">Clique aqui e retorne para a página principal</h1>
                </Link>
            </div>
        </div>
    );
}