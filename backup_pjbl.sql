--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: saepul
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO saepul;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: saepul
--

COMMENT ON SCHEMA public IS '';


--
-- Name: kategoriObatIsHardCode; Type: TYPE; Schema: public; Owner: saepul
--

CREATE TYPE public."kategoriObatIsHardCode" AS ENUM (
    'BEBAS',
    'KERAS',
    'TERBATAS',
    'NARKOTIKA'
);


ALTER TYPE public."kategoriObatIsHardCode" OWNER TO saepul;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Barang; Type: TABLE; Schema: public; Owner: saepul
--

CREATE TABLE public."Barang" (
    id integer NOT NULL,
    "kodeProduk" text,
    "namaBarang" text NOT NULL,
    "detilBarang" text,
    stok integer,
    "tglKadaluarsa" timestamp(3) without time zone,
    "idSupplier" integer NOT NULL,
    "idRakBarang" integer NOT NULL,
    "tanggalMasuk" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    "tanggalKeluar" timestamp(3) without time zone,
    "idKategori" integer NOT NULL,
    "hargaAwal" integer NOT NULL,
    "hargaJual" integer NOT NULL,
    "biayaSupplai" integer NOT NULL
);


ALTER TABLE public."Barang" OWNER TO saepul;

--
-- Name: Barang_id_seq; Type: SEQUENCE; Schema: public; Owner: saepul
--

CREATE SEQUENCE public."Barang_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Barang_id_seq" OWNER TO saepul;

--
-- Name: Barang_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saepul
--

ALTER SEQUENCE public."Barang_id_seq" OWNED BY public."Barang".id;


--
-- Name: Role; Type: TABLE; Schema: public; Owner: saepul
--

CREATE TABLE public."Role" (
    id integer NOT NULL,
    "roleName" text NOT NULL
);


ALTER TABLE public."Role" OWNER TO saepul;

--
-- Name: Role_id_seq; Type: SEQUENCE; Schema: public; Owner: saepul
--

CREATE SEQUENCE public."Role_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Role_id_seq" OWNER TO saepul;

--
-- Name: Role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saepul
--

ALTER SEQUENCE public."Role_id_seq" OWNED BY public."Role".id;


--
-- Name: SupplierBarang; Type: TABLE; Schema: public; Owner: saepul
--

CREATE TABLE public."SupplierBarang" (
    id integer NOT NULL,
    "namaSupplier" text,
    "emailSupplier" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."SupplierBarang" OWNER TO saepul;

--
-- Name: SupplierBarang_id_seq; Type: SEQUENCE; Schema: public; Owner: saepul
--

CREATE SEQUENCE public."SupplierBarang_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."SupplierBarang_id_seq" OWNER TO saepul;

--
-- Name: SupplierBarang_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saepul
--

ALTER SEQUENCE public."SupplierBarang_id_seq" OWNED BY public."SupplierBarang".id;


--
-- Name: Transaksi; Type: TABLE; Schema: public; Owner: saepul
--

CREATE TABLE public."Transaksi" (
    id integer NOT NULL,
    "idTransaksi" text NOT NULL,
    quantity integer NOT NULL,
    total integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "kodeBarang" text NOT NULL,
    "hargaPerProduk" integer NOT NULL,
    "namaProduk" text NOT NULL
);


ALTER TABLE public."Transaksi" OWNER TO saepul;

--
-- Name: Transaksi_id_seq; Type: SEQUENCE; Schema: public; Owner: saepul
--

CREATE SEQUENCE public."Transaksi_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Transaksi_id_seq" OWNER TO saepul;

--
-- Name: Transaksi_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saepul
--

ALTER SEQUENCE public."Transaksi_id_seq" OWNED BY public."Transaksi".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: saepul
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    username text,
    email text,
    password text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "roleId" integer NOT NULL,
    image bytea
);


ALTER TABLE public."User" OWNER TO saepul;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: saepul
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."User_id_seq" OWNER TO saepul;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saepul
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: saepul
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO saepul;

--
-- Name: kategoriObat; Type: TABLE; Schema: public; Owner: saepul
--

CREATE TABLE public."kategoriObat" (
    id integer NOT NULL,
    "kategoriObat" text NOT NULL
);


ALTER TABLE public."kategoriObat" OWNER TO saepul;

--
-- Name: kategoriObat_id_seq; Type: SEQUENCE; Schema: public; Owner: saepul
--

CREATE SEQUENCE public."kategoriObat_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."kategoriObat_id_seq" OWNER TO saepul;

--
-- Name: kategoriObat_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: saepul
--

ALTER SEQUENCE public."kategoriObat_id_seq" OWNED BY public."kategoriObat".id;


--
-- Name: Barang id; Type: DEFAULT; Schema: public; Owner: saepul
--

ALTER TABLE ONLY public."Barang" ALTER COLUMN id SET DEFAULT nextval('public."Barang_id_seq"'::regclass);


--
-- Name: Role id; Type: DEFAULT; Schema: public; Owner: saepul
--

ALTER TABLE ONLY public."Role" ALTER COLUMN id SET DEFAULT nextval('public."Role_id_seq"'::regclass);


--
-- Name: SupplierBarang id; Type: DEFAULT; Schema: public; Owner: saepul
--

ALTER TABLE ONLY public."SupplierBarang" ALTER COLUMN id SET DEFAULT nextval('public."SupplierBarang_id_seq"'::regclass);


--
-- Name: Transaksi id; Type: DEFAULT; Schema: public; Owner: saepul
--

ALTER TABLE ONLY public."Transaksi" ALTER COLUMN id SET DEFAULT nextval('public."Transaksi_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: saepul
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Name: kategoriObat id; Type: DEFAULT; Schema: public; Owner: saepul
--

ALTER TABLE ONLY public."kategoriObat" ALTER COLUMN id SET DEFAULT nextval('public."kategoriObat_id_seq"'::regclass);


--
-- Data for Name: Barang; Type: TABLE DATA; Schema: public; Owner: saepul
--

COPY public."Barang" (id, "kodeProduk", "namaBarang", "detilBarang", stok, "tglKadaluarsa", "idSupplier", "idRakBarang", "tanggalMasuk", "tanggalKeluar", "idKategori", "hargaAwal", "hargaJual", "biayaSupplai") FROM stdin;
1	AB90POP9W	OBH COMBI	Obat Flu Dan Batuk	83	2025-12-16 17:00:00	1	9	2024-02-26 07:31:42.882	\N	1	28000	32000	480000
3	AB90POP7U	PARAMEX	Obat Flu Dan Batuk	76	2028-12-14 17:00:00	2	7	2024-02-27 02:14:27.181	\N	1	28000	32000	430000
4	AB9080990	RANITIDIN	Obat Flu Dan Batuk	88	2026-07-13 17:00:00	3	1	2024-02-27 05:48:51.731	\N	1	12000	14000	120000
5		LAMBUCID	Obat Lambung	16	2026-07-23 17:00:00	3	1	2024-02-27 05:55:29.891	\N	3	14000	16000	140000
\.


--
-- Data for Name: Role; Type: TABLE DATA; Schema: public; Owner: saepul
--

COPY public."Role" (id, "roleName") FROM stdin;
1	Pemilik
2	Staff
\.


--
-- Data for Name: SupplierBarang; Type: TABLE DATA; Schema: public; Owner: saepul
--

COPY public."SupplierBarang" (id, "namaSupplier", "emailSupplier", "createdAt") FROM stdin;
1	Combiphar	support@combiphar.com	2024-02-26 07:13:40.418
2	Konimex	support@konimex.com	2024-02-26 15:51:45.357
3	Hexpharm Jaya	contact@hexpharm.co.id	2024-02-27 05:47:27.863
\.


--
-- Data for Name: Transaksi; Type: TABLE DATA; Schema: public; Owner: saepul
--

COPY public."Transaksi" (id, "idTransaksi", quantity, total, "createdAt", "kodeBarang", "hargaPerProduk", "namaProduk") FROM stdin;
1	45F1186C-636	3	84000	2024-02-26 07:40:16.78	AB90POP9W	28000	OBH COMBI
3	238C167E-5DB	7	196000	2024-02-27 02:14:51.292	AB90POP7U	28000	PARAMEX
4	8506023C-3E5	2	56000	2024-02-27 02:23:14.526	AB90POP7U	28000	PARAMEX
5	638C7490-AE1	1	28000	2024-02-27 03:23:41.81	AB90POP7U	28000	PARAMEX
6	40601CEB-E99	4	112000	2024-02-27 03:24:43.289	AB90POP9W	28000	OBH COMBI
7	84F52B04-646	2	56000	2024-02-27 03:26:26.896	AB90POP7U	28000	PARAMEX
8	9467EF1B-74D	2	56000	2024-02-27 05:50:40.027	AB90POP7U	28000	PARAMEX
9	8E9117E7-385	2	24000	2024-02-27 05:50:40.027	AB9080990	12000	RANITIDIN
10	F9E5B0D7-60C	4	56000	2024-02-27 05:56:02.145		14000	LAMBUCID
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: saepul
--

COPY public."User" (id, username, email, password, "createdAt", "roleId", image) FROM stdin;
2	msaefulid10	admin@gmail.com	admin123	2024-02-26 07:18:45.154	1	\N
4	saepull	saepul102@gmail.com	epul123	2024-02-26 07:33:10.198	2	\N
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: saepul
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
b3a81398-0e34-4ac3-a563-2bd33d97867c	1268938144ce0ffa8bd3c8863f97b96a6790ab44383227ed57915f7d097bfce1	2024-02-26 13:58:32.755863+07	20240220121402_	\N	\N	2024-02-26 13:58:32.689439+07	1
756fd97c-787a-477e-9cc5-5a3ad7637c3b	d96d7fb3d1ad66c74cbe920b1ca3af2de3febfdaffb9b0a03e67b3693891ebc6	2024-02-26 13:58:30.253939+07	20240125043141_	\N	\N	2024-02-26 13:58:28.954211+07	1
70810c8f-ba47-4db5-8860-4098b4f69d30	10a52303f68d97f0ab52f547140bc23ffeaa07f01a22a420aaa304f6f03f526f	2024-02-26 13:58:30.342645+07	20240125043309_	\N	\N	2024-02-26 13:58:30.276286+07	1
b1929d84-f9dc-4361-8989-578b5c7fd07a	918ca072be24da44bbe638d51ab8f9e26bda8e2b2d2d13d38f6ef682c38cccc9	2024-02-26 13:58:30.431637+07	20240125043456_	\N	\N	2024-02-26 13:58:30.365131+07	1
e6fd2069-9e1a-4ced-8732-ca776a2c8e36	cebdfb9faa325076a9fef0f17db6a7013172aaa81cbeed4228eb4cd497d58c82	2024-02-26 13:58:32.844725+07	20240223030159_	\N	\N	2024-02-26 13:58:32.778159+07	1
1cdd0e63-4c53-4667-b3da-ca3c91548ad8	418bfcc04de0ed6b8962d2c897d2caf869922bc40c104016aa411628a5cd7f78	2024-02-26 13:58:30.854225+07	20240125044227_	\N	\N	2024-02-26 13:58:30.453969+07	1
3dce109c-2022-4807-8f44-990339829306	0c49d0de8610899dcc8d2416526fe0369b977e15a9e6524ee05f6a3fbe63085d	2024-02-26 13:58:31.154283+07	20240131160724_	\N	\N	2024-02-26 13:58:30.876704+07	1
8c8c3cc8-c59e-41d0-8091-868263a46c67	35bdcc7150a3ae5aa875ce158bace5a5b98e1cb8a6ce7c64fed6cf69bec57989	2024-02-26 13:58:31.243125+07	20240204131350_	\N	\N	2024-02-26 13:58:31.176836+07	1
46f55061-93a8-4450-a678-3130356ab8f4	03268ea2752b0bbec19ea8260c38f947eda106d22d2b76824078395e61f2faf8	2024-02-26 13:58:32.933585+07	20240225121645_	\N	\N	2024-02-26 13:58:32.867218+07	1
c4e5865e-daac-4a0f-8708-0e2bc93fa040	9d2b7b5e145c6808aac7c3558a5cde5a198c743adfa9d698f4a1164001d4b6ab	2024-02-26 13:58:31.332059+07	20240206015547_	\N	\N	2024-02-26 13:58:31.265564+07	1
5e293403-eb1c-4c50-8f4d-834a063bb727	69cd3fb26afff9404d0fcd9b8d86ab501dbb0b0ed755a2c14a873280a4a6ce62	2024-02-26 13:58:31.454286+07	20240212072621_update_barang_struct	\N	\N	2024-02-26 13:58:31.387999+07	1
facee071-8857-4114-8ad9-eb9104e5f601	76774e3fcac2f7e141936e90393ced3a298815ede8b29610a8ec8309810489b7	2024-02-26 13:58:31.54313+07	20240213041338_	\N	\N	2024-02-26 13:58:31.476708+07	1
5a35c636-9b43-44cd-adfc-74a43d692f72	13435582b54db69a8aeaa8c5b32006281a788e132d56c6705ec2921eb07d6d92	2024-02-26 13:58:33.167048+07	20240226065701_	\N	\N	2024-02-26 13:58:32.956215+07	1
d12e0ef7-cf6a-4095-ad80-4f144a63ef21	1cb65fc1dc63492d9fefdb5928b6f653eaa2245d3e69b186a4ed36d19499a622	2024-02-26 13:58:31.854722+07	20240213062729_	\N	\N	2024-02-26 13:58:31.56563+07	1
4177b987-5b94-48b1-b80b-26862f00c6f7	81e7b55e5affc7cfdc83730181dc0cbdbc7e359a9fbb0d924ff6002c3d26f4d2	2024-02-26 13:58:32.144561+07	20240217052320_	\N	\N	2024-02-26 13:58:31.899454+07	1
d1372ce5-b547-44cc-9d3e-c77b7fbfdb27	346c45b640567b40487f95fe3554667e60644dd424189a0f617af45233a5f94e	2024-02-26 13:58:32.300345+07	20240217052658_	\N	\N	2024-02-26 13:58:32.18927+07	1
dcd8a6a8-3069-4f15-ae2d-a16d0707b4a0	cf31e436aee010c2c44227d39e0d91d09428388e7f1bb69b3dbb2105b863c4c7	2024-02-27 11:03:18.574767+07	20240227040318_	\N	\N	2024-02-27 11:03:18.458765+07	1
730e5e30-29da-4ba9-afec-c055b63689f8	ad70c3458094c2cffd3986ac6a7bef75a7b3e829c09282e2bb29417aa3a73611	2024-02-26 13:58:32.578135+07	20240218092341_	\N	\N	2024-02-26 13:58:32.32271+07	1
0b0c69fc-2470-4e79-92d9-a06128fb1065	c82bf41766c9ce5e516437c0564eb6bb07f6456383347eee559606700a27bb06	2024-02-26 13:58:32.666947+07	20240220120947_	\N	\N	2024-02-26 13:58:32.600463+07	1
cc480762-2e87-459e-b0f1-8853b0df886d	f67256a3a9ae7743e6b7f480a683f8c46cf053703fa9a0c9e8f36042f41e1e39	2024-02-27 11:11:18.304408+07	20240227041118_	\N	\N	2024-02-27 11:11:18.221194+07	1
57dadc5a-47e6-4465-b719-1d50173bc27c	1bac8fac2a1d91aff9053a1d365f51a76b6c91f755fab265439cfbbde1b9d711	2024-02-27 11:17:15.49029+07	20240227041715_	\N	\N	2024-02-27 11:17:15.360975+07	1
d3b9b1ed-e007-4554-80c6-e5944e833f34	fcc457cafb3ad638d05003f761a680e50dce7bdeebf5dad9bf7d22012d23f76a	2024-02-27 11:22:31.110582+07	20240227042231_	\N	\N	2024-02-27 11:22:31.028067+07	1
\.


--
-- Data for Name: kategoriObat; Type: TABLE DATA; Schema: public; Owner: saepul
--

COPY public."kategoriObat" (id, "kategoriObat") FROM stdin;
1	Obat Bebas
2	Obat Keras
3	Obat Terbatas
4	Obat Narkotika
\.


--
-- Name: Barang_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saepul
--

SELECT pg_catalog.setval('public."Barang_id_seq"', 5, true);


--
-- Name: Role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saepul
--

SELECT pg_catalog.setval('public."Role_id_seq"', 2, true);


--
-- Name: SupplierBarang_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saepul
--

SELECT pg_catalog.setval('public."SupplierBarang_id_seq"', 3, true);


--
-- Name: Transaksi_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saepul
--

SELECT pg_catalog.setval('public."Transaksi_id_seq"', 10, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saepul
--

SELECT pg_catalog.setval('public."User_id_seq"', 4, true);


--
-- Name: kategoriObat_id_seq; Type: SEQUENCE SET; Schema: public; Owner: saepul
--

SELECT pg_catalog.setval('public."kategoriObat_id_seq"', 2, true);


--
-- Name: Barang Barang_pkey; Type: CONSTRAINT; Schema: public; Owner: saepul
--

ALTER TABLE ONLY public."Barang"
    ADD CONSTRAINT "Barang_pkey" PRIMARY KEY (id);


--
-- Name: Role Role_pkey; Type: CONSTRAINT; Schema: public; Owner: saepul
--

ALTER TABLE ONLY public."Role"
    ADD CONSTRAINT "Role_pkey" PRIMARY KEY (id);


--
-- Name: SupplierBarang SupplierBarang_pkey; Type: CONSTRAINT; Schema: public; Owner: saepul
--

ALTER TABLE ONLY public."SupplierBarang"
    ADD CONSTRAINT "SupplierBarang_pkey" PRIMARY KEY (id);


--
-- Name: Transaksi Transaksi_pkey; Type: CONSTRAINT; Schema: public; Owner: saepul
--

ALTER TABLE ONLY public."Transaksi"
    ADD CONSTRAINT "Transaksi_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: saepul
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: saepul
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: kategoriObat kategoriObat_pkey; Type: CONSTRAINT; Schema: public; Owner: saepul
--

ALTER TABLE ONLY public."kategoriObat"
    ADD CONSTRAINT "kategoriObat_pkey" PRIMARY KEY (id);


--
-- Name: Barang_kodeProduk_key; Type: INDEX; Schema: public; Owner: saepul
--

CREATE UNIQUE INDEX "Barang_kodeProduk_key" ON public."Barang" USING btree ("kodeProduk");


--
-- Name: Barang_namaBarang_key; Type: INDEX; Schema: public; Owner: saepul
--

CREATE UNIQUE INDEX "Barang_namaBarang_key" ON public."Barang" USING btree ("namaBarang");


--
-- Name: Role_roleName_key; Type: INDEX; Schema: public; Owner: saepul
--

CREATE UNIQUE INDEX "Role_roleName_key" ON public."Role" USING btree ("roleName");


--
-- Name: SupplierBarang_namaSupplier_key; Type: INDEX; Schema: public; Owner: saepul
--

CREATE UNIQUE INDEX "SupplierBarang_namaSupplier_key" ON public."SupplierBarang" USING btree ("namaSupplier");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: saepul
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_username_key; Type: INDEX; Schema: public; Owner: saepul
--

CREATE UNIQUE INDEX "User_username_key" ON public."User" USING btree (username);


--
-- Name: kategoriObat_kategoriObat_key; Type: INDEX; Schema: public; Owner: saepul
--

CREATE UNIQUE INDEX "kategoriObat_kategoriObat_key" ON public."kategoriObat" USING btree ("kategoriObat");


--
-- Name: Barang Barang_idKategori_fkey; Type: FK CONSTRAINT; Schema: public; Owner: saepul
--

ALTER TABLE ONLY public."Barang"
    ADD CONSTRAINT "Barang_idKategori_fkey" FOREIGN KEY ("idKategori") REFERENCES public."kategoriObat"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Barang Barang_idSupplier_fkey; Type: FK CONSTRAINT; Schema: public; Owner: saepul
--

ALTER TABLE ONLY public."Barang"
    ADD CONSTRAINT "Barang_idSupplier_fkey" FOREIGN KEY ("idSupplier") REFERENCES public."SupplierBarang"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Transaksi Transaksi_kodeBarang_fkey; Type: FK CONSTRAINT; Schema: public; Owner: saepul
--

ALTER TABLE ONLY public."Transaksi"
    ADD CONSTRAINT "Transaksi_kodeBarang_fkey" FOREIGN KEY ("kodeBarang") REFERENCES public."Barang"("kodeProduk") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: User User_roleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: saepul
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public."Role"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: saepul
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

