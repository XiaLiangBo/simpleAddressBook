(function(){
	brite.registerView("AddContactView",{
		create: function(){
			return render("AddContactView")
		},
		postDisplay: function(data){
			var view = this;
			var data = data || {};
			view.groupId = data.groupId;
			view.contactId = data.contactId;
			if(data.contactId){
				showContactInfo.call(view);
			}
		},
		events: {
			"click; .cancel": function (e) {
				var view = this;
				view.$el.remove();
			},
			"click; .create": function (e) {
				var view = this;
				var name = view.$el.find("[name='name']").val();
				var email = view.$el.find("[name='email']").val();
				if(name == "" || email == ""){
					alert("Do not leave blank");
					return;
				}
				if(view.contactId){
					app.contactDao.update(view.contactId,{name:name,email:email}).done(function(result){
						view.$el.trigger("DO_REFRESH_CONTACT");
						view.$el.remove();
					});
				}else{
					app.contactDao.create({name:name,email:email,groupId:view.groupId*1}).done(function(result){
						view.$el.trigger("DO_REFRESH_CONTACT");
						view.$el.remove();
					});
				}
			}
		}
	});

	function showContactInfo(){
		var view = this;
		var contactId = view.contactId;
		app.contactDao.get(contactId*1).done(function(result){
			view.$el.find("[name='name']").val(result.name);
			view.$el.find("[name='email']").val(result.email);
		});

	}
})();