this.Documents = new Mongo.Collection("documents");

if (Meteor.isClient){
  Template.editor.helpers({
    docid:function(){
      var doc = Documents.findOne();
      if (doc){
        return doc._id;
      }
      else{
        return undefined;
      }
    }
  });
}

if (Meteor.isServer){
  Meteor.startup(function(){
    //Startup code that creates a document in case there isn't one yet.
    if (!Documents.findOne()){ // No documents yet!
      Documents.insert({title: "my new document"});
    }
  });
}
