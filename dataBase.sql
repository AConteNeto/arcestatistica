CREATE DATABASE arcestatistica;

CREATE TABLE arcestatistica.page (
    id  INT UNSIGNED NOT NULL AUTO_INCREMENT,
    url VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE arcestatistica.visitor (
    ip  VARCHAR(45) NOT NULL,
    lastAccess DATETIME NOT NULL,
    PRIMARY KEY(ip)
);

CREATE TABLE arcestatistica.visitorAccessPage (
    date DATETIME NOT NULL,
    pageId  INT UNSIGNED NOT NULL,
    visitorIp  VARCHAR(45) NOT NULL,
    browser VARCHAR(15) NOT NULL,
    platform VARCHAR(15) NOT NULL,
    FOREIGN KEY(pageId) REFERENCES page(id),
    FOREIGN KEY(visitorIp) REFERENCES visitor(ip)
);