package org.projectmvc.web;

import com.britesnow.snow.web.param.annotation.WebParam;
import com.britesnow.snow.web.param.annotation.WebUser;
import com.britesnow.snow.web.rest.annotation.WebGet;
import com.google.inject.Singleton;
import org.projectmvc.dao.IDao;
import org.projectmvc.entity.Contact;
import org.projectmvc.entity.Group;
import org.projectmvc.entity.GroupContact;
import org.projectmvc.entity.User;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;

@Singleton
public class ContactWebRest {

    @Inject
    private IDao<GroupContact,GroupContact.Id> groupContactIDao;

    @Inject
    private IDao<Group,Long> groupIDao;

    @Inject
    private IDao<Contact,Long> contactIDao;

    @com.google.inject.Inject
    private WebResponseBuilder webResponseBuilder;

    @WebGet("/getGroupsName")
    public WebResponse getGroupsName(@WebUser User user,@WebParam("id") Long id){
        List<GroupContact> groupContacts = groupContactIDao.list(user,null,0,100,"contactId");
        StringBuilder groupNames = new StringBuilder();
        for(GroupContact groupContact:groupContacts){
            if(groupContact.getContactId().equals(id)){
                String groupName = groupIDao.get(user,(Long)groupContact.getGroupId()).orElse(null).getName();
                groupNames.append("," + groupName);
            }
        }
        String result = groupNames.toString();
        if(result.equals("")){
            result = ",no-group";
        }
        return webResponseBuilder.success(result.substring(1));
    }

    @WebGet("/list")
    public WebResponse listContact(@WebUser User user,@WebParam("groupId") Long groupId){
        List<Contact> contacts = contactIDao.list(user,null,0,100,"id");
        List<GroupContact> groupContacts = groupContactIDao.list(user,null,0,100,"contactId");
        List<Contact> newArray = new ArrayList<>();

        if(groupId != null){
            for(Contact contact:contacts){
                for(GroupContact groupContact:groupContacts){
                    if(groupId.equals(groupContact.getGroupId()) && contact.getId().equals(groupContact.getContactId())){
                        newArray.add(contact);
                    }
                }
            }
        }else{
            newArray = contacts;
        }

        return webResponseBuilder.success(newArray);
    }

}
