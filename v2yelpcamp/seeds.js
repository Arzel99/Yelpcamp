var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var data = [
	{
		name: "Cloud's Rest",
		image:"http://www.visitmelbourne.com/-/media/images/high-country/things-to-do/outdoor-activities/camping-falls-to-hotham-alpine-crossing_hc_r_1461477_1150x863.jpg?ts=20151020370426&cp=95&w=480&h=360&crop=1|/-/media/images/high-country/things-to-do/outdoor-activities/camping-falls-to-hotham-alpine-crossing_hc_r_1461477_1150x863.jpg?ts=20151020370426&cp=95&w=720&h=540&crop=1",
		description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
	},
	{
		name: "Mountain edge",
		image:"https://cdn.vox-cdn.com/thumbor/-JoPdcgAuLTUsWiDZ62CX4wb33k=/0x0:5225x3479/1200x800/filters:focal(2195x1322:3031x2158)/cdn.vox-cdn.com/uploads/chorus_image/image/54137643/camping_tents.0.jpg",
		description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable."
	},
	{
		name: "In the jungle",
		image:"http://www.nationalparks.nsw.gov.au/~/media/DF58734103EF43669F1005AF8B668209.ashx",
		description: "Deep in the jungle with wild animals and insects !!!! But it is a good adventurous place."
	},
]

function seedDB() {
	//Remove all campgrounds
	Campground.remove({}, function(err){
		if (err) {
			console.log(err);
		}
		console.log("removed campgrounds !");
		data.forEach(function(seed){
			Campground.create(seed, function(err, campground){
				if (err) {
					console.log(err);
				} else {
					console.log("added campgrounds !");
					Comment.create(
							{
								text: "This place is great , but I wish there was internet",
								author: "Sid"
							}, function(err, comment){
								if (err) {
									console.log(err);
								} else {
										campground.comments.push(comment);
										campground.save();
										console.log("Created comment");
								}
							
							});
				}
			});
		});
	});

	

}
module.exports = seedDB;