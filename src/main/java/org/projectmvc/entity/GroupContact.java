package org.projectmvc.entity;

public class GroupContact extends BaseEntity<GroupContact.Id> {

    private Long groupId;
    private Long contactId;

    public Long getGroupId() {
        return (getId() == null)?null:getId().groupId;
    }
    public void setGroupId(Long groupId) {
        getOrCreateId().groupId = groupId;
    }

    public Long getContactId() {
        return (getId() == null)?null:getId().contactId;
    }
    public void setContactId(Long contactId) {
        getOrCreateId().contactId = contactId;
    }

    private Id getOrCreateId(){
        Id id = getId();
        if (id == null){
            id = new Id();
            setId(id);
        }
        return id;
    }

    public static class Id{
        private Long groupId;
        private Long contactId;

        public Id(){};

        public Id(Long groupId, Long contactId){
            this.groupId = groupId;
            this.contactId = contactId;
        }

        public Long getGroupId() {
            return groupId;
        }

        public void setGroupId(Long groupId) {
            this.groupId = groupId;
        }

        public Long getContactId() {
            return contactId;
        }

        public void setContactId(Long contactId) {
            this.contactId = contactId;
        }
    }
}
