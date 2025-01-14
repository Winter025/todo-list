const Header = ( {children}: {children: string} ) => {
    return (
        <div className="header">
            <b>{children}</b>
        </div>
    );
}

export default Header