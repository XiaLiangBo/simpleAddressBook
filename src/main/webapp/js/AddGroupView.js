(function(){
    brite.registerView("AddGroupView",{
        create: function(){
            return render("AddGroupView")
        },
        postDisplay: function(){
            var view = this;
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
                    view.$el.trigger("DO_REFRESH_GROUP");
                    view.$el.remove();
                });
            }
        }
    });
})();