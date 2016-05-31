this.Documents = new Mongo.Collection("documents");
if (Meteor.isClient) {
// find the first document in the Documents collection and send back its id
  Template.editor.helpers({
    docid:function(){
      var doc = Documents.findOne();
      if (doc){
        return doc._id;
      }
      else {
        return undefined;
      }
    }, 
    //template helper necessary for passing in our editor data.
    config:function(){
      return function(editor){
        editor.setOption("lineNumbers", true);
        editor.on("change", function(cm_editor, info){
          $("#viewer_iframe").contents().find("html").html(cm_editor.getValue());
        });        
      }
    }, 
  });
}
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code that runs at startup and creates a document in case it doesn’t exist. 
    if (!Documents.findOne()){// no documents yet!
      Documents.insert({title:"my new document"});
    }
  });
}