(function(){
	brite.registerView("ContactView",{
		create: function(){
			return render("ContactView")
		},
		postDisplay: function(data){
			var view = this;
			var data = data || {};
			view.groupId = data.id;
			showContact.call(view);
		},
		events: {
			"click; .delete-contact": function (e) {
				var view = this;
				var contactId = $(e.currentTarget).closest(".contact-item").find(".item-id").text();
				app.contactDao.delete(contactId).done(function(result){
					showContact.call(view);
					view.$el.trigger("DO_REFRESH_GROUP");
				});
			},
			"click; .add-contact": function (e) {
				var view = this;
				var groupId = view.groupId;
				brite.display("AddContactView","body",{groupId:groupId});
			},
			"click; .edit-contact": function (e) {
				var view = this;
				var contactId = $(e.currentTarget).closest(".contact-item").find(".item-id").text();
				brite.display("AddContactView","body",{contactId:contactId});
			},
			"click; .add-group-contact": function (e) {
				var view = this;
				var contactId = $(e.currentTarget).closest(".contact-item").find(".item-id").text();
				brite.display("AddGroupContactView","body",{contactId:contactId});
			}
		},

		docEvents: {
			"DO_REFRESH_CONTACT":function (e) {
				var view = this;
				showContact.call(view);
			}
		}
	});

	function showContact(){
		var view = this;
		var groupId = view.groupId;
		var $contactCtn = view.$el.find(".contact-ctn").empty();

		app.contactDao.list({groupId:groupId}).done(function(result){
			$.each(result,function(index) {
				var contact = result[index];
				var contactId = contact.id;
				app.contactDao.getGroupsName({id:contactId}).done(function(result){
					contact.groupName = result;
					var html = render("Contact-items",contact);
					$contactCtn.append(html);
				});
			});
		});
	}
})();