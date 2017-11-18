import { MongoObservable } from 'meteor-rxjs';

import { Matchstats } from '../models/matchstats.ts';

export const MatchStats = new MongoObservable.Collection<MatchStats>('MatchStats');