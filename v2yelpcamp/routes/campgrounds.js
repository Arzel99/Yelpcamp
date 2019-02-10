var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");
router.get("/campgrounds", function(req, res){
	Campground.find({},function(err, allCampgrounds){
	if (err) {
		console.log(err);
	}else {
		
		res.render("campgrounds",{campgrounds: allCampgrounds, currentUser: req.user});
	}	
	});
	
});

router.post("/campgrounds", middleware.isLoggedIn, function(req, res){
	var name = req.body.name;
	var price = req.body.price;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newCampground = {name: name,price: price, image: image, description: desc, author: author}
	Campground.create(newCampground,function(err, newlyCreated){
		if (err) {
		console.log(err);
	}else {
		
		res.redirect("/campgrounds");
	}
	});
	
});
router.get("/campgrounds/new", middleware.isLoggedIn, function(req, res){
	res.render("new");
});

router.get("/campgrounds/:id", function(req, res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
         if (err) {
		console.log(err);
	}else {
		console.log(foundCampground);
		res.render("show", {campground: foundCampground});
	}
	});
	//req.params.id
	
});

// EDIT CAMPGROUND ROUTE
router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
		Campground.findById(req.params.id, function(err, foundCampground){
            res.render("edit", {campground: foundCampground});	
	});
});
router.put("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if (err) {
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});
// DELETE CAMPGROUNDS
router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if (err) {
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds");
		}
	});
});


module.exports = router;