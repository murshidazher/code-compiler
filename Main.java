import java.util.Scanner;
class Main {
    public static void main(String[] args){
        Scanner input=new Scanner(System.in);
        System.out.print("Enter an integer:");
        
        int rows=input.nextInt();
        System.out.println("You entered : "+ rows);
        input.close(); 
        
        for(int i = 1; i <= rows; ++i) {
            for(int j = 1; j <= i; ++j) {
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}