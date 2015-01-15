-- quick EMPTY : truncate "user", group, groupcontact, contact RESTART IDENTITY cascade;
-- quick DROP  : drop table  "user", group, groupcontact,contact;

-- --------- user --------- --
CREATE TABLE "user"
(
	id bigserial NOT NULL,
	username character varying(128),
	"fullName" character varying(128),
	pwd character varying(256),
	CONSTRAINT user_pkey PRIMARY KEY (id)
);
create index on "user" (username);
-- --------- /user --------- --

-- --------- group --------- --
CREATE TABLE "group"
(
	id bigserial NOT NULL,
	name character varying(128),

	CONSTRAINT group_pkey PRIMARY KEY ("id")
);
-- --------- /group --------- --

-- --------- groupcontact --------- --
CREATE TABLE groupcontact
(
	"groupId" bigint NOT NULL,
	"contactId" bigint NOT NULL,

	CONSTRAINT groupcontact_pkey PRIMARY KEY ("groupId", "contactId")
);
-- --------- /groupcontact --------- --

-- --------- Contact --------- --
CREATE TABLE contact
(
	id bigserial NOT NULL,
	name character varying(128),
	email character varying(128),

	CONSTRAINT contact_pkey PRIMARY KEY ("id")
);
-- --------- /Contact --------- --

