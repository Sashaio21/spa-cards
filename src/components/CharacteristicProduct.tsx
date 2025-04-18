
type Props = {
    characteristics: Record<string, string | number>; // 👈 пара ключ: значение
  };

export default function CharacteristicProduct({characteristics }:Props) {
    return (
        <ul
            className="col"
            style={{
                width: "100%",
                gap: "10px",
            }}
        >
        {Object.entries(characteristics).map(([key, value]) => (
            <li className="row" key={key}>
            <p style={{ whiteSpace: "nowrap" }}>{key}</p>
            <div
                style={{
                flex: 1,
                borderBottom: "1px dotted #636363",
                margin: "0 5px",
                }}
            ></div>
            <p style={{ whiteSpace: "nowrap" }}>{value}</p>
            </li>
        ))}
        </ul>
    )
}