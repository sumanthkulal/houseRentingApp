const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const methodOverride=require("method-override");
const path=require("path");


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

const MONGO_URL="mongodb://127.0.0.1:27017/wonderlust";
main().
then(()=>{
    console.log("conneected to DB");
})
.catch(()=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

// app.get("/testListing",async (req,res)=>{
//     let sampleListing=new Listing({
//         titile:"My new Villa",
//         description:"by the beach",
//         lacation:"goa",
//         country:"india"
//     });
//      await sampleListing.save();
//      console.log("sample was saved");
//      res.send("succesfull testing");
// })

app.get("/listings",async (req,res)=>{
    let allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
}); 

app.get("/listings/new",(req,res)=>{
        res.render("listings/new.ejs");
});

app.get("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
})

//create route
app.post("/listings",async (req,res)=>{
    let listing=req.body.listing;
    console.log(listing);
    const newListing=new Listing(listing);
    newListing.save();
    res.redirect("/listings");
})

app.get("/listings/:id/edit",async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
})
app.put("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
})
//delete route
app.delete("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
})

app.get("/",(req,res)=>{
    res.send("hi i am in root");
})
app.listen(8080,()=>{
    console.log("app listening at port 8080");
})


