#include <stdio.h>
#include <time.h>
#include <string.h>
#include <stdlib.h>

struct node {
    char title[200];
    char description[800];
    int date[3];
    int eventType;
    struct node* next;
    struct node* prev;
};

struct node* head = NULL;
static int counter = 0;
char *eventTypes[] = {"CONCERT", "EXHIBITION", "MEETING", "PARTY", "SEMINAR", "SOCIAL_EVENT", "SPORTS_EVENT", "OTHER"};

void addToFile(char *title, char *description, int eventType, int date[]) {
    FILE *file = fopen("events.txt", "a");
    if (file != NULL) {
        fprintf(file, "\nTitle: %s\nDescription: %s\nEvent Type: %s\nDate: %d-%d-%d\n\n",
                title, description, eventTypes[eventType - 1], date[0], date[1], date[2]);
        fclose(file);
    } else
        printf("Error opening file!\n");
}

void insertEvent(char *title, char *description, int et, int date[]) {
    struct node* nn = (struct node*)malloc(sizeof(struct node));
    counter++;

    strcpy(nn->title, title);
    strcpy(nn->description, description);

    nn->eventType = et;
    nn->date[0] = date[0];
    nn->date[1] = date[1];
    nn->date[2] = date[2];
    nn->next = NULL;
    nn->prev = NULL;

    if (head == NULL) {
        head = nn;
    } else {
        struct node* curr = head;
        while (curr != NULL &&
               (curr->date[0] < date[0] ||//check year
                (curr->date[0] == date[0] && curr->date[1] < date[1]) ||//check year and month
                (curr->date[0] == date[0] && curr->date[1] == date[1] && curr->date[2] < date[2]))) {// check year, month and day
            curr = curr->next;
        }
        if (curr == head) {
            nn->next = curr;
            curr->prev = nn;
            head = nn;
        } else if (curr == NULL) {
            struct node* last = head;
            while (last->next != NULL) {
                last = last->next;
            }
            last->next = nn;
            nn->prev = last;
        } else {
            nn->next = curr;
            nn->prev = curr->prev;
            curr->prev->next = nn;
            curr->prev = nn;
        }
    }
}

void getTodayEvents() {//show todays events
    struct node* curr = head;
    time_t t = time(NULL);
    struct tm* tm = localtime(&t);
    while (curr != NULL && !(curr->date[0] == tm->tm_year + 1900 &&
                    curr->date[1] == tm->tm_mon + 1 &&
                    curr->date[2] == tm->tm_mday))
        curr = curr->next;
    if (curr == NULL) {
        printf("There are no events for today");
    } else {
        printf("\n\t Title     : %s \n", curr->title);
        printf("\t Description : %s \n", curr->description);
        printf("\t Event Type  : %s\n", eventTypes[curr->eventType-1]);
    }
}

void getUserEventTypes(int eventType) {
    printf("\nEvents of type %d:\n", eventType);
    struct node* curr = head;
    while (curr != NULL) {
        if (curr->eventType == eventType) {
            printf("\n Title= %s \n Description= %s \n EventType= %s\n Created at %d-%d-%d \n",
                    curr->title, curr->description, eventTypes[curr->eventType - 1],
                    curr->date[0], curr->date[1], curr->date[2]);
        }
        curr = curr->next;
    }
}

void getUserEventsDate(int date[]) {
    printf("\nEvents on %d-%d-%d\n", date[0],date[1],date[2]);
    struct node* curr = head;
    while (curr != NULL) {
        if (curr->date[0] == date[0]&&curr->date[1]==date[1]&&curr->date[2]==date[2]) {
            printf("\n Title= %s \n Description= %s \n EventType= %s\n Created at %d-%d-%d \n",
                    curr->title, curr->description, eventTypes[curr->eventType - 1],
                    curr->date[0], curr->date[1], curr->date[2]);
        }
        curr = curr->next;
    }
}

void addEventsFromFile() {
    FILE *file = fopen("events.txt", "r");
    if (file != NULL) {
        char title[200], description[800], eventTypeStr[200];
        int date[3], eventType;

        while (fscanf(file, "\nTitle: %[^\n]\nDescription: %[^\n]\nEvent Type: %[^\n]\nDate: %d-%d-%d\n\n",
                      title, description, eventTypeStr, &date[0], &date[1], &date[2]) == 6) {
            for (eventType = 1; eventType <= 8; ++eventType) {
                if (strcmp(eventTypes[eventType - 1], eventTypeStr) == 0) {
                    break;
                }
            }
            insertEvent(title, description, eventType, date);
        }

        fclose(file);
    } else {
        printf("Error opening file for reading!\n");
    }
}

void deleteEvent(char *title) {
    struct node *curr = head;
    while (curr != NULL) {
        if (strcmp(curr->title, title) == 0) {
            if (curr->prev != NULL) {
                curr->prev->next = curr->next;
            } else {
                head = curr->next;
            }
            if (curr->next != NULL) {
                curr->next->prev = curr->prev;
            }
            free(curr);
            counter--;
            printf("Event deleted successfully.\n");
            writeToFile();  // Update the file after deletion
        }
        curr = curr->next;
    }
}

void updateEvent(char *title) {
    struct node *curr = head;
    while (curr != NULL) {
        if (strcmp(curr->title, title) == 0) {
            printf("Enter the new title for the event\n");
            fflush(stdin);
            scanf("%s", curr->title);
            printf("Enter the new description for the event\n");
            fflush(stdin);
            scanf("%s", curr->description);
            printf("Enter the new type of event\n");
            fflush(stdin);
            scanf("%d", &curr->eventType);
            printf("Enter the new date for this event (yyyy-mm--dd)\n");
            for (int i = 0; i < 3; i++) {
                scanf("%d", &curr->date[i]);
            }
            printf("Event updated successfully.\n");
            writeToFile();  // Update the file after modification
        }
        curr = curr->next;
    }
}

void writeToFile() {
    FILE *file = fopen("events.txt", "w");
    if (file != NULL) {
        struct node *curr = head;
        while (curr != NULL) {
            fprintf(file, "\nTitle: %s\nDescription: %s\nEvent Type: %s\nDate: %d-%d-%d\n\n",
                    curr->title, curr->description, eventTypes[curr->eventType - 1], curr->date[0], curr->date[1], curr->date[2]);
            curr = curr->next;
        }
        fclose(file);
    } else {
        printf("Error opening file!\n");
    }
}


void display() {
    struct node* curr = head;
    printf("\n \tThere are total %d  Events : \n", counter);
    while (curr != NULL) {
        printf("\n Title=%s \n Description=%s \n EventType=%s\n Created at %d-%d-%d \n", curr->title, curr->description, eventTypes[curr->eventType - 1], curr->date[0], curr->date[1], curr->date[2]);
        curr = curr->next;
    }
}

int main() {
    int date[3], i, j, eventOption,eventType;
    char title[200], desc[500],searchTitle[200];
    int choice, userOption;
    addEventsFromFile();
    getTodayEvents();

    while (1) {
        printf("\n\n\t\t\tMenu\n");
        printf("\nEnter 1) To insert events to your calendar\n");
        printf("\nEnter 2) To view events in your calendar\n");
        printf("\nEnter 3) Search for events based on eventTypes\n");
        printf("\nEnter 4) Search for events based on date\n");
        printf("\nEnter 5) Delete a Particular Event\n");
        printf("\nEnter 6) Update a particular Event\n");
        printf("\nEnter 7) to exit\n");
        scanf("%d", &userOption);

        if (userOption == 1) {
            printf("\nEnter the title for the event\n");
            fflush(stdin);
            scanf("%[^\n]", title);
            fflush(stdin);
            printf("\nEnter the description for the event\n");
            scanf("%[^\n]", desc);
            fflush(stdin);
            printf("\n\t\tEnter the Type of event \n Pick any option from the below Options: \n 1)CONCERT \n 2)EXHIBITION \n 3) MEETING \n 4) OTHER \n 5) PARTY \n 6) SEMINAR \n 7) SOCIAL_EVENT \n 8) SPORTS_EVENT \n");
            scanf("%d", &choice);
            fflush(stdin);
            printf(" Enter date for this event in yyyy-mm--dd Format\n");
            for (i = 0; i < 3; i++) {
                if (i == 0) {
                    printf("\nEnter the year : \n");
                    scanf("%d", &date[i]);
                } else if (i == 1) {
                    printf("Enter the month : \n");
                    scanf("%d", &date[i]);
                } else {
                    printf("Enter the day : \n");
                    scanf("%d", &date[i]);
                }
            }
            insertEvent(title, desc, choice, date);
            addToFile(title, desc, choice, date);
            printf("Event inserted Successfully");
        }
        else if (userOption == 2) {
            display();
        }
        else if (userOption == 3) {
            printf("\n\t\tEnter the type of event u want to search for \n Pick any option from the below Options: \n 1)CONCERT \n 2)EXHIBITION \n 3) MEETING \n 4) OTHER \n 5) PARTY \n 6) SEMINAR \n 7) SOCIAL_EVENT 8) SPORTS_EVENT \n");
            fflush(stdin);
            scanf("%d", &eventType);
            getUserEventTypes(eventType);
        }
        else if (userOption == 4) {
                printf("Enter the events you want to search on a particular date\n");
                fflush(stdin);
                date[0]=0;date[1]=0;date[2]=0;
                printf("Enter the year \n");
                scanf("%d",&date[0]);
                printf("Enter the month\n");
                scanf("%d",&date[1]);
                printf("Enter the day\n");
                scanf("%d",&date[2]);
                getUserEventsDate(date);
        }
        else if(userOption==5){
            printf("\nEnter the title of the event you want to delete: ");
            fflush(stdin);
            scanf("%s", searchTitle);
            deleteEvent(searchTitle);
        }
        else if(userOption==6){
            printf("\nEnter the title of the event you want to update: ");
            fflush(stdin);
            scanf("%s", searchTitle);
            updateEvent(searchTitle);
        }
        else{
            return 0;
        }
    }
    return 0;
}
