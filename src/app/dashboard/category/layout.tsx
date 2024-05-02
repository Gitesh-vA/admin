export default function CategoryLayout({children} : Readonly<{
    children: React.ReactNode
}>){
    return(
        <>  
            <div>
                {children}
            </div>
        </>
    )
}