const Hello = () => {
    const data = {
        nama: 'Aditya Kunto',
        jabatan: 'Technical Mentor'
    }
    const date = new Date()
    const time = date.toLocaleTimeString()
    return (
        <div>
            <h1>{data.nama}</h1>
            <h2>{data.jabatan}</h2>
            <h3>{time}</h3>
            <input type="number" min={5}
                style={{ border: "3px solid" }} />
        </div>
    );
}

export default Hello;
