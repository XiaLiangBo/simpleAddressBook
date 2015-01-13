-- quick EMPTY : truncate "user", group, contact RESTART IDENTITY cascade;
-- quick DROP  : drop table  "user", group, contact;

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

-- --------- contact --------- --
CREATE TABLE contact
(
	id bigserial NOT NULL,
	name character varying(128),
	email character varying(128),
	"groupId" bigint,

	CONSTRAINT contact_pkey PRIMARY KEY ("id")
);
-- --------- /contact --------- --

