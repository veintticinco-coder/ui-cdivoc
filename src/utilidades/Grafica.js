

export const Grafica = ({ datos, clase }) => {
    const conteo = datos.reduce((sum, x) => sum + x.count, 0);
    let total = 15, multiplos = 5;

    switch (true) {
        case conteo <= 15:
            total = 15;
            multiplos = 5;
            break;
        case conteo <= 25:
            total = 25;
            break;
        case conteo <= 50:
            total = 50;
            multiplos = 10;
            break;
        case conteo <= 200:
            total = 200;
            multiplos = 20;
            break;
        case conteo <= 400:
            total = 400;
            multiplos = 50;
            break;
        default:
            total = 15;
            multiplos = 5;
            break;
    }

    let items = [];
    for (let i = 0; i <= (total / multiplos); i++) {
        items.push(<li key={(`${clase}-li-${i}`)}><span>{(i * multiplos)}</span></li>);
    }
    
    return (
        <>
            <div className="contenedor-grafica">
                <ul className={`${clase} grafica`}>
                    {datos.map(registro =>
                        <li key={`li ${registro.name}`}>
                            <span>{registro.name} ({registro.count})</span>
                        </li>
                    )}
                </ul>
                <ul className="legend">
                    {items}
                </ul>
                <style jsx="true">
                    {datos.map((registro, key) => {
                        const percent = ((registro.count / total) * 100);
                        return `.${clase} li:nth-child(${key + 1})::after{width: ${percent}%;}`
                    })}
                </style>
            </div>
        </>
    )
}
