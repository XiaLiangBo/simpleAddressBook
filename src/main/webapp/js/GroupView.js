(function(){
	brite.registerView("GroupView",{
		create: function(){
			return render("GroupView")
		},
		postDisplay: function(){
			var view = this;
			showGroup.call(view);
		},

		events: {
			"click; .delete-group": function (e) {
				var view = this;
				var $item = $(e.currentTarget).closest(".group-item");
				var id = $item.attr("data-id");
				app.groupDao.delete(id).done(function(result){
					app.groupContactDao.delete({groupId:id*1}).done(function(result){
						showGroup.call(view);
						view.$el.trigger("DO_REFRESH_CONTACT");
					});
				});
			},
			"click; .add-group": function (e) {
				var view = this;
				brite.display("AddGroupView","body");
			},
			"click; .group-item": function (e) {
				var view = this;
				view.$el.find("h2").removeClass("active");
				view.$el.find(".group-item").removeClass("active");
				var $item = $(e.currentTarget).addClass("active");
				var id = $item.attr("data-id");
				brite.display("ContactView",view.$el.closest(".MainView-content").find(".MainView-contentPanel").bEmpty(),{id:id});
			},
			"click; .groups": function (e) {
				var view = this;
				view.$el.find(".group-item").removeClass("active");
				var $item = $(e.currentTarget).addClass("active");
				brite.display("ContactView",view.$el.closest(".MainView-content").find(".MainView-contentPanel").bEmpty());
			}
		},

		docEvents: {
			"DO_REFRESH_GROUP":function (e) {
				var view = this;
				showGroup.call(view);
			}
		}
	});

	function showGroup(){
		var view = this;
		var $groupCtn = view.$el.find(".group-items").empty();

		app.groupDao.list().done(function(result){
			var html = render("GroupsView-groups",{result:result});
			$groupCtn.html(html);
		});
	}


})();