import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {SchemaName} from 'src/common/constants/schema';
import {BaseService} from 'src/common/services/base.service';
import {UserService} from 'src/user/user.service';
import {User} from 'src/user/schemas/user.schema';
import {
  Conversation,
} from './schemas/conversation.schema';
import {CreateConversationDto} from './dto/create-conversation.dto';
import {ConversationMember} from './schemas/conversation-member.schema';
import {perm} from 'src/common/utils/perm';

@Injectable()
export class ConversationService extends BaseService<Conversation> {
  constructor(
    @InjectModel(SchemaName.CONVERSATION)
    private readonly conversationModel: Model<Conversation>,
    private readonly userService: UserService,
  ) {
    super(conversationModel);
  }

  async createConversation(
    requestUser: User,
    dto: CreateConversationDto,
  ): Promise<Conversation> {
    const members: ConversationMember[] = [];
    for (const member of dto.members) {
      const user = await this.userService.findByIdOrFail(member.user);
      const addedMemeber = new ConversationMember({
        user,
      });
      members.push(addedMemeber);
    }
    const addMe = new ConversationMember({user: requestUser});
    members.push(addMe);
    const permArray = perm(members);
    const conversationCondtion = {
      $or: [...permArray.map(item => ({members: item}))],
    };
    const conversationSearch = await this.findOne(conversationCondtion);
    if (conversationSearch !== null) return conversationSearch;
    const conversation = new this.conversationModel({
      ...dto,
      members,
    });
    await conversation.save();
    return conversation;
  }

  async getListConversations(
    requestUser: User,
    // query: BaseQuery,
  ): Promise<Conversation[]> {
    // const { page = 0, pageSize = 20 } = query;
    const conversations = await this.conversationModel
      .find({
        members: {
          $elemMatch: {
            user: requestUser._id,
          },
        },
        // lastSent: { $exists: true },
      })
      // .limit(pageSize)
      // .skip(page * pageSize)
      .sort({updatedAt: -1});
    return conversations;
  }
}
