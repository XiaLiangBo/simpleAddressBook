(function(){

	brite.registerView("MainView",{parent:"body"}, {

		create: function(){
			return render("MainView");
		},
		postDisplay: function(){
			var view = this;
			brite.display("GroupView",view.$el.find(".MainView-leftPanel"));
			brite.display("ContactView",view.$el.find(".MainView-contentPanel").bEmpty());
		}

	});

})();
