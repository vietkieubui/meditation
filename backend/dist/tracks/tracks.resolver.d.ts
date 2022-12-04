import { CreateTrackInput } from './dto/create-track.input';
import { TracksService } from './tracks.service';
export declare class TracksResolver {
    private readonly tracksService;
    constructor(tracksService: TracksService);
    createTrack(input: CreateTrackInput): Promise<import("./tracks.schema").Tracks>;
    findAll(): Promise<import("./tracks.schema").Tracks[]>;
    findOne(id: string): Promise<import("./tracks.schema").Tracks>;
    updateTrack(id: string, input: CreateTrackInput): Promise<import("./tracks.schema").Tracks>;
    removeTrack(id: string): Promise<import("./tracks.schema").Tracks>;
    updateTitle(id: string, title: string): Promise<import("./tracks.schema").Tracks>;
}
