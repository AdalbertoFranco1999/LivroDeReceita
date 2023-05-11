import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()

const db = mysql.createConnection({
    
    host:"localhost",
    user:"root",
    password:"123456",
    database:"db_receita"
})

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.json("oi, aqui é o backend")
})

app.get("/tbl_receita",(req,res)=>{
    const q = "SELECT * FROM tbl_receita"
    db.query(q,(err,data)=>{
        if(err)return res.json(err)
        return res.json(data)
    })
})

app.post("/tbl_receita", (req,res)=>{

    const q = "INSERT INTO tbl_receita(`nome_receita`, `peso_receita`, `temperatura_receita`, `igrediente_receita`, `instrucoes_receita`,`img_receita`) VALUES (?)"
    const values = [
        req.body.nome_receita ,
        req.body.peso_receita ,
        req.body.temperatura_receita ,
        req.body.igrediente_receita ,
        req.body.instrucoes_receita ,
        req.body.img_receita ,
    ];
    //const values = ["nome pelo back","peso pelo back","temp pelo back","igre pelo back","instrucoes pelo back","img pelo back"]

    db.query(q,[values],(err, data)=>{
        if(err) return res.json(err)
        return res.json("Receita criada :)");
    })

})

app.delete("/tbl_receita/:id_receita",(req,res)=>{
    const receitaId = req.params.id_receita;
    const q = "DELETE FROM tbl_receita WHERE id_receita =  ?"

    db.query(q,[receitaId],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Receita apagada :)");
    })
})

app.listen(8800, ()=>{
    console.log("Conectado com o Backend")
})