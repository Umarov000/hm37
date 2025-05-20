const sendErrorRes = (err, res)=>{
    console.log(err);
    res.status(400).send({message: "Xatolik", error: err})
}


module.exports = {
    sendErrorRes
}