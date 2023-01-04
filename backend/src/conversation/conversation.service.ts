import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import mongoose, {Model} from 'mongoose';
import {SchemaName} from 'src/common/constants/schema';
import {BaseService} from 'src/common/services/base.service';
import {UserService} from 'src/user/user.service';
import {User} from 'src/user/schemas/user.schema';
import {Conversation} from './schemas/conversation.schema';
import {
  CreateConversationByPhoneNumberDto,
  CreateConversationDto,
} from './dto/create-conversation.dto';
import {ConversationMember} from './schemas/conversation-member.schema';
import {perm} from 'src/common/utils/perm';
import {HttpException} from 'src/common/exceptions';
import {ERROR} from 'src/common/constants';

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

  async createConversationByPhoneNumber(
    requestUser: User,
    dto: CreateConversationByPhoneNumberDto,
  ): Promise<Conversation> {
    const members: ConversationMember[] = [];
    const user = await this.userService.findOne({phoneNumber: dto.phoneNumber});
    if (!user) throw HttpException.badRequest(ERROR.USER_NOT_FOUND);
    const addedMemeber = new ConversationMember({
      user,
    });
    members.push(addedMemeber);
    const addMe = new ConversationMember({user: requestUser});
    members.push(addMe);
    const permArray = perm(members);
    const conversationCondtion = {
      $or: [...permArray.map(item => ({members: item}))],
    };
    const conversationSearch = await this.findOne(conversationCondtion);
    if (conversationSearch !== null) return conversationSearch;
    const conversation = new this.conversationModel({
      members,
    });
    await conversation.save();
    return conversation;
  }
  async getListConversations(requestUser: User): Promise<Conversation[]> {
    // const conversations = await this.conversationModel
    //   .find({
    //     members: {
    //       $elemMatch: {
    //         _id: requestUser._id,
    //       },
    //     },
    //   })
    //   .sort({updatedAt: -1});
    const conversations = await this.conversationModel
      .find({
        members: {
          $elemMatch: {
            user: requestUser,
          },
        },
      })
      .sort({updatedAt: -1});
    return conversations;
  }
}
