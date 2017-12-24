import { Meteor } from 'meteor/meteor';
import { MatchStats } from '../../imports/collections/matchstats';


Meteor.methods({
    allPlayersInMatches(){
        let distinct = Meteor.wrapAsync(MatchStats.rawCollection().distinct, MatchStats.rawCollection());
        let result = distinct('tOneOff');
        result = result.concat(distinct('tTwoOff'));
        result = result.concat(distinct('tOneDef'));
        result = result.concat(distinct('tTwoDef'));
        //console.log(result);
        
        return _.uniq(result);
        

    //    var data = MatchStats.find({},{fields:{"tOneDef":1,"tOneOff":1,"tTwoOff":1,"tTwoDef":1}}).fetch()
    //     //console.log(data)
    //     if(data){
    //         var names=[];
    //         data.forEach((match)=>{
    //             //console.log(match.tOneDef);
    //             names.push(match.tOneOff,match.tOneDef,match.tTwoDef,match.tTwoDef);
    //             //console.log(names)
    //         });
    //         //console.log(_.uniq(names));
    //     }

    //    Meteor.wrapAsync(MatchStats.rawCollection().distinct, MatchStats.rawCollection()); 
       
    //    MatchStats.rawCollection().distinct('tOneOff', (err,res) =>{
    //         console.log(res)
    //     });

    }
});