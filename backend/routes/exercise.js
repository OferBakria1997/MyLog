const router=require('express').Router();
let Exercise=require('../models/exersice.model');

router.get(('/:id'),(req, res) =>
{  
    const id = req.params.id
    console.log(id)
    Exercise.find({"id":id})
    .then(exercises=>res.json(exercises))
    .catch(err=>res.json(err+"\n error to data"))
})

router.post(('/add'),(req,res)=>
{
    const id = req.body.id
    const description=req.body.description
    const duration=Number(req.body.duration)
    const date=Date.parse(req.body.date)

    const newExercise=new Exercise({id,description,duration,date});
    newExercise.save()
    .then(()=>res.json("Excersice added"))
    .catch(err=>res.json(err+"failed to added Exercise"))
})

router.delete(('/:id'),(req,res)=>
{
    const id =req.params.id
    Exercise.findByIdAndDelete(id)
    .then(()=>res.json('execrise deleted'))
    .catch(()=>res.json('error'))

})

module.exports=router;



