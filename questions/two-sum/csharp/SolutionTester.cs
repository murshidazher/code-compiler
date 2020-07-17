using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

public class SolutionTester
{
	private const string TESTCASE_FILE = "../testcase.txt";

	public static void Main(string[] args)
	{
		Solution solution = new Solution();
		List<string> testCaseResults = new List<string>();

		bool testResult = true;
		try
		{
			StreamReader br = new StreamReader(TESTCASE_FILE);
			try
			{
				string line;
				int count = 0;
				while (!string.ReferenceEquals((line = br.ReadLine()), null))
				{
					int[] nums = ParserUtil.stringToIntegerArray(line);
					line = br.ReadLine();
					int target = int.Parse(line);
					line = br.ReadLine();
					int[] expected = ParserUtil.stringToIntegerArray(line);
					
					// wrap in try catch exception
					try {
						// create an test execution
						int[] ret = solution.twoSum(nums, target);

						
						testResult = Enumerable.SequenceEqual(expected, ret);
						
						count++;

						if (!testResult)
						{
							testCaseResults.Add("[Fail] " + " [Input] " + nums + ", " + target + "  [Returned] " + "[" + string.Join(", ", ret) + "]" + " [Expected] " + "[" + string.Join(", ", expected) + "]");
						
						}
						else
						{
							testCaseResults.Add("[Success] Your solution passed");
						}
					} 
					catch (Exception io)
					{
						testCaseResults.Add("[Fail] exception");
					}
					
				}
			}
			catch (Exception io)
			{
				Console.WriteLine(io);
				Console.WriteLine(io.Message);
			}
			finally
			{
				br.Close();
			}
		}
		catch (IOException ioe)
		{
			Console.WriteLine(ioe.Message);

		}
		finally
		{
			foreach (object i in testCaseResults)
			{
				Console.WriteLine(i);
			}	
		}
	}
}