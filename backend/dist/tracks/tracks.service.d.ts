import { Model } from 'mongoose';
import { CreateTrackInput } from './dto/create-track.input';
import { Tracks, TracksDocument } from './tracks.schema';
export declare class TracksService {
    private tracksModel;
    constructor(tracksModel: Model<TracksDocument>);
    create(input: CreateTrackInput): Promise<Tracks>;
    findAll(): Promise<Tracks[]>;
    findOne(id: string): Promise<Tracks>;
    update(id: string, input: CreateTrackInput): Promise<Tracks>;
    remove(id: string): Promise<Tracks>;
    updateTitle(id: string, title: string): Promise<Tracks>;
}
