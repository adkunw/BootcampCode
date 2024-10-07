const Hello = () => {
    const data = {
        nama: 'Aditya Kunto',
        jabatan: 'Technical Mentor'
    }
    return (
        <div>
            <h1>{data.nama}</h1>
            <h2>{data.jabatan}</h2>
            <input type="number" min={5}
                style={{ border: "3px solid" }} />
        </div>
    );
}

export default Hello;
