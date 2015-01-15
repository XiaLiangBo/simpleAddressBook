(function(){
    brite.registerView("AddGroupContactView",{
        create: function(){
            return render("AddGroupContactView")
        },
        postDisplay: function(data){
            var view = this;
            view.contactId = data.contactId
        },
        events: {
            "click; .cancel": function (e) {
                var view = this;
                view.$el.remove();
            },
            "click; .create": function (e) {
                var view = this;
                var groupName = view.$el.find("input").val();
                if(groupName == ""){
                    alert("Do not leave blank");
                    return;
                }
                app.groupDao.create({name:groupName}).done(function(result){
                    var groupId = result.id;
                    app.groupContactDao.create({groupId:groupId*1,contactId:view.contactId*1 }).done(function(result){
                        view.$el.trigger("DO_REFRESH_GROUP");
                        view.$el.trigger("DO_REFRESH_CONTACT");
                        view.$el.remove();
                    });
                });
            }
        }
    });
})();